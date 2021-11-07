const request = require('supertest');
const server = require("../server");
const app = server.app;

const testProduct = {
    "name": "Test Product",
    "description": "Test description",
    "brand": "Test",
    "price": 150,
    "id": "testProductId"
}


describe('API working tests', () => {
    beforeAll(async () => {
        require("sinon").stub(console);
        await server.deploy();
    })

    it('should answer with a 200 OK althought it has not deleted anything (DELETE /products/{id})', async() => {
        const response = await request(app).delete("/api/v1/products/" + testProduct.id);
        expect(response.statusCode).toBe(200);

    });

    it('should obtain products not containing test product (GET /products', async() => {
        const response = await request(app).get("/api/v1/products");
        expect(response.body.filter(product => {return product.id == testProduct.id})).toStrictEqual([]);
        expect(response.statusCode).toBe(200);

    });

    it('should create the test product (PUT /products/{id}', async() => {
        const response = await request(app).put("/api/v1/products/" + testProduct.id).send(testProduct);
        expect(response.body).toStrictEqual(testProduct);
        expect(response.statusCode).toBe(200);

    });

    it('should obtain the test product (GET /products/{id}', async() => {
        const response = await request(app).get("/api/v1/products/" + testProduct.id);
        expect(response.body).toStrictEqual(testProduct);
        expect(response.statusCode).toBe(200);

    });

    it('should obtain products containing test product (GET /products', async() => {
        const response = await request(app).get("/api/v1/products");
        expect(response.body.filter(product => {return product.id == testProduct.id})[0]).toStrictEqual(testProduct);
        expect(response.statusCode).toBe(200);

    });

    it('should modify the test product (PUT /products/{id}', async() => {
        testProduct.name = "Test Product Modified";
        const response = await request(app).put("/api/v1/products/" + testProduct.id).send(testProduct);
        expect(response.body).toStrictEqual(testProduct);
        expect(response.statusCode).toBe(200);

    });

    it('should obtain the modified test product (GET /products/{id}', async() => {
        const response = await request(app).get("/api/v1/products/" + testProduct.id);
        expect(response.body).toStrictEqual(testProduct);
        expect(response.statusCode).toBe(200);

    });
    

    it('should answer with a 200 OK (DELETE /products/{id})', async() => {
        const response = await request(app).delete("/api/v1/products/" + testProduct.id);
        expect(response.statusCode).toBe(200);

    });

    it('should not obtain the test product (GET /products/{id}', async() => {
        const response = await request(app).get("/api/v1/products/" + testProduct.id);
        expect(response.body).toStrictEqual({"message": "Product not found"});
        expect(response.statusCode).toBe(404);

    });

    it('should obtain products not containing test product (GET /products', async() => {
        const response = await request(app).get("/api/v1/products");
        expect(response.body.filter(product => {return product.id == testProduct.id})).toStrictEqual([]);
        expect(response.statusCode).toBe(200);

    });

    afterAll(() => {
        setTimeout(() => {
            server.undeploy();
        }, 1000);
    }); 
});

