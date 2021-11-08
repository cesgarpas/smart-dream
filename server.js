'use strict';

const http = require('http');
const express = require('express');
const app = express();

// Firebase init
const admin = require('firebase-admin');
const serviceAccount = require('./private/smart-dream-cesgarpas-firebase-adminsdk-w1qmp-60d1b488a1');

const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json({
    strict: false
}));
const oasTools = require('oas-tools');
const jsyaml = require('js-yaml');
const serverPort = process.env.PORT || 8080;

const spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
const oasDoc = jsyaml.safeLoad(spec);

// For stopping the server
let server;

const deploy = (env) => {
    return new Promise((resolve, reject) => {
        const optionsObject = {
            controllers: path.join(__dirname, './controllers'),
            loglevel: env === "test" ? 'error': 'info',
            strict: false,
            router: true,
            validator: true
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        oasTools.configure(optionsObject);

        oasTools.initialize(oasDoc, app, function () {
            server = http.createServer(app).listen(serverPort, function () {
                if (env !== "test"){
                    console.log('App running at http://localhost:' + serverPort);
                    console.log('________________________________________________________________');
                    if (optionsObject.docs !== false) {
                        console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
                        console.log('________________________________________________________________');
                    }
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
    server.close();
};

module.exports = {
    app: app,
    deploy: deploy,
    undeploy: undeploy
};