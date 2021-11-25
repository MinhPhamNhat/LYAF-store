const ProductDAO = require("../repo/ProductDAO");
const ColorDAO = require("../repo/ColorDAO");
const SizeDAO = require("../repo/SizeDAO");
const CategoryDAO = require("../repo/CategoryDAO");
const { validationResult } = require("express-validator");
const { getPayload, addCart, parseCart, removeCart } = require("../../helper/function");
class APIController {
  async getSetupList(req, res, next) {
    var colors = await ColorDAO.getList();
    var sizes = await SizeDAO.getList();
    var categories = await CategoryDAO.getList();
    res.status(200).json({ colors, sizes, categories });
  }

  async checkOut(req, res, next) {}

  async getCart(req, res, next) {
    var cart = req.cookies.cart
    var parsedCart = await parseCart(cart)
    res.status(200).json(parsedCart)
  }

  async addCart(req, res, next) {
    const validate = validationResult(req);
    if (validate.errors.length) {
      let errors = validate.mapped();
      res.status(400).json({ errors });
    } else {
      const colorId = req.query.colorId;
      const productId = req.query.productId;
      const sizeId = req.query.sizeId;
      const quantity = Number.parseInt(req.query.quantity);
      var result = await ProductDAO.getSubProduct({ productId, colorId, sizeId });
      switch (result.code) {
        case 1:
          var cart = req.cookies.cart
          if (cart){
            cart = addCart(cart, {newProduct: result.data[0], quantity})
          }else{
            cart = [{
              subProdId: result.data[0]._id,
              quantity
            }]
          }
          res.cookie('cart', cart)
          var parsedCart = await parseCart(cart)
          res.status(200).json({ code: 200, data: result.data, parsedCart });
          break;
        case 0:
          res.status(404).json({ code: 404, message: result.message });
          break;
        case -1:
          res.status(500).json({ code: 500, message: result.message });
          break;
      }
    }
  }

  async removeCart(req, res, next){
    const id = req.query.id
    var cart = req.cookies.cart
    cart = removeCart(cart, id)
    res.cookie('cart', cart)
    res.status(200).json({code: 200})

  }

  async addProduct(req, res, next) {
    const validate = validationResult(req);
    if (validate.errors.length) {
      let errors = validate.mapped();
      res.status(400).json({ errors });
    } else {
      var payload = await getPayload(req);
      if (payload.code !== 1) {
        res.status(payload.code == 0 ? 400 : 500).json({
          errors: {
            images: {
              msg: payload.message,
              param: "images",
            },
          },
        });
      } else {
        var result = await ProductDAO.createNew(payload.data, { isNew: true });
        switch (result.code) {
          case 1:
            res.status(200).json({ code: 200, productId: result._id });
            break;
          case -1:
            res.status(500).json({ code: 500, message: result.message });
            break;
        }
      }
    }
  }

  async getSub(req, res, next) {
    const validate = validationResult(req);
    if (validate.errors.length) {
      let errors = validate.mapped();
      res.status(400).json({ errors });
    } else {
      const colorId = req.query.colorId;
      const productId = req.query.productId;
      const sizeId = req.query.sizeId;
      var result;
      if (sizeId) {
        result = await ProductDAO.getSubProduct({ productId, colorId, sizeId });
      } else {
        result = await ProductDAO.getSubProduct({ productId, colorId });
      }
      switch (result.code) {
        case 1:
          res.status(200).json({ code: 200, data: result.data });
          break;
        case 0:
          res.status(404).json({ code: 404, message: result.message });
          break;
        case -1:
          res.status(500).json({ code: 500, message: result.message });
          break;
      }
    }
  }
}

module.exports = new APIController();
