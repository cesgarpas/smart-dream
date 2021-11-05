'use strict'

module.exports.findProductByid = function findProductByid(req, res, next) {
  res.send({
    message: 'This is the mockup controller for findProductByid'
  });
};

module.exports.deleteProduct = function deleteProduct(req, res, next) {
  res.send({
    message: 'This is the mockup controller for deleteProduct'
  });
};

module.exports.updateProduct = function updateProduct(req, res, next) {
  res.send({
    message: 'This is the mockup controller for updateProduct'
  });
};