'use strict'

const firestore = require('firebase-admin').firestore();

module.exports.findProductByid = async function findProductByid(req, res, next) {
  try {
    const productDoc = await firestore.collection("products").doc(req.id.value).get()
    if (!productDoc.exists) {
      res.status(404).send({
        message: 'Product not found'
      })
    } else {
      res.send({...productDoc.data(), id: productDoc.id});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error getting product'
    });
  }
};

module.exports.deleteProduct = async function deleteProduct(req, res, next) {
  try {
    await firestore.collection("products").doc(req.id.value).delete();
    res.send({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error deleting product'
    });
  }
};

module.exports.updateProduct = async function updateProduct(req, res, next) {
  try {
    const product = {
      name: req.product.value.name,
      price: req.product.value.price,
      description: req.product.value.description,
      brand: req.product.value.brand
    };

    await firestore.collection("products").doc(req.id.value).set(product);

    res.send({ ...product, id: req.id.value });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error updating product'
    });
  }
};