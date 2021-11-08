'use strict';

const firestore = require('firebase-admin').firestore();

module.exports.getProducts = async function getProducts (req, res, next) {
  try {
    const productsCollection = await firestore.collection('products').get();
    const products = productsCollection.docs.map(doc => { return { ...doc.data(), id: doc.id }; });
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error getting products',
      code: 500
    });
  }
};

module.exports.addProduct = async function addProduct (req, res, next) {
  try {
    const product = {
      name: req.productRequest.value.name,
      price: req.productRequest.value.price,
      description: req.productRequest.value.description,
      brand: req.productRequest.value.brand
    };

    const persistedProduct = await firestore.collection('products').add(product);

    res.status(201).send({ ...product, id: persistedProduct.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error creating product',
      code: 500
    });
  }
};
