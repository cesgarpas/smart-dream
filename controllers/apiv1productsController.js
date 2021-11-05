'use strict';

const apiv1productsController = require('./apiv1productsControllerService');

module.exports.getProducts = function getProducts (req, res, next) {
  apiv1productsController.getProducts(req.swagger.params, res, next);
};

module.exports.addProduct = function addProduct (req, res, next) {
  apiv1productsController.addProduct(req.swagger.params, res, next);
};
