'use strict'

var varapiv1productsController = require('./apiv1productsControllerService');

module.exports.getProducts = function getProducts(req, res, next) {
  varapiv1productsController.getProducts(req.swagger.params, res, next);
};

module.exports.addProduct = function addProduct(req, res, next) {
  varapiv1productsController.addProduct(req.swagger.params, res, next);
};