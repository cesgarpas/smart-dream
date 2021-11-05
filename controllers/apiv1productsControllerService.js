'use strict';

const firestore = require('firebase-admin').firestore();

module.exports.getProducts = async function getProducts(req, res, next) {
  try {
    const productsCollection = await firestore.collection("products").get();
    const products = productsCollection.docs.map(doc => { return { ...doc.data(), id: doc.id } });
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error getting products'
    });
  }
};

module.exports.addProduct = async function addProduct(req, res, next) {
  try {
    const product = {
      name: req.product.value.name,
      price: req.product.value.price,
      description: req.product.value.description,
      brand: req.product.value.brand
    };

    const persistedProduct = await firestore.collection("products").add(product);

    res.send({ ...product, id: persistedProduct.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error creating product'
    });
  }
};