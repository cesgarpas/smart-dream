'use strict';

const apiv1productsidController = require('./apiv1productsidControllerService');

module.exports.findProductByid = function findProductByid (req, res, next) {
  apiv1productsidController.findProductByid(req.swagger.params, res, next);
};

module.exports.deleteProduct = function deleteProduct (req, res, next) {
  apiv1productsidController.deleteProduct(req.swagger.params, res, next);
};

module.exports.updateProduct = function updateProduct (req, res, next) {
  apiv1productsidController.updateProduct(req.swagger.params, res, next);
};
