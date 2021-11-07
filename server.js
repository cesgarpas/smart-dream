'use strict';

const express = require('express');
const app = express();

const deploy = () => {
    return new Promise((resolve, reject) => {
        // Firebase init
        const admin = require('firebase-admin');
        const serviceAccount = require('./smart-dream-cesgarpas-firebase-adminsdk-w1qmp-60d1b488a1');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        const fs = require('fs');
        const http = require('http');
        const path = require('path');

        const bodyParser = require('body-parser');
        app.use(bodyParser.json({
            strict: false
        }));
        const oasTools = require('oas-tools');
        const jsyaml = require('js-yaml');
        const serverPort = 8080;

        const spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
        const oasDoc = jsyaml.safeLoad(spec);

        const optionsObject = {
            controllers: path.join(__dirname, './controllers'),
            loglevel: 'info',
            strict: false,
            router: true,
            validator: true
        };

        oasTools.configure(optionsObject);

        oasTools.initialize(oasDoc, app, function () {
            http.createServer(app).listen(serverPort, function () {
                console.log('App running at http://localhost:' + serverPort);
                console.log('________________________________________________________________');
                if (optionsObject.docs !== false) {
                    console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
                    console.log('________________________________________________________________');
                }
                resolve();
            });
        });

        app.get('/info', function (req, res) {
            res.send({
                info: 'This API was generated using oas-generator!',
                name: oasDoc.info.title
            });
        });
    })
}

const undeploy = () => {
    process.exit(0);
};

module.exports = {
    app: app,
    deploy: deploy,
    undeploy: undeploy
};