'use strict'

var varapiv1productsidController = require('./apiv1productsidControllerService');

module.exports.findProductByid = function findProductByid(req, res, next) {
  varapiv1productsidController.findProductByid(req.swagger.params, res, next);
};

module.exports.deleteProduct = function deleteProduct(req, res, next) {
  varapiv1productsidController.deleteProduct(req.swagger.params, res, next);
};

module.exports.updateProduct = function updateProduct(req, res, next) {
  varapiv1productsidController.updateProduct(req.swagger.params, res, next);
};