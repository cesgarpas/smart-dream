'use strict'

module.exports.getProducts = function getProducts(req, res, next) {
  res.send({
    message: 'This is the mockup controller for getProducts'
  });
};

module.exports.addProduct = function addProduct(req, res, next) {
  res.send({
    message: 'This is the mockup controller for addProduct'
  });
};