const ProductDAO = require("../repo/ProductDAO");
const ColorDAO = require("../repo/ColorDAO");
const SizeDAO = require("../repo/SizeDAO");
const CategoryDAO = require("../repo/CategoryDAO");
const AddressDAO = require("../repo/AddressDAO");
const BillDAO = require("../repo/BillDAO");
const { validationResult } = require("express-validator");
const { getPayload, addCart, parseCart, removeCart, parseSearch } = require("../../helper/function");
class APIController {
  async getSetupList(req, res, next) {
    var colors = await ColorDAO.getList();
    var sizes = await SizeDAO.getList();
    var categories = await CategoryDAO.getList();
    res.status(200).json({ colors, sizes, categories });
  }

  async checkOut(req, res, next) {
    const validate = validationResult(req);
    if (validate.errors.length) {
      let errors = validate.mapped();
      res.status(400).json({ errors });
    }else{
        const payload = req.body;
        const user = req.user;
        const cart = req.cookies.cart
        const result = await BillDAO.createBill(payload, user, cart)
        console.log(result)
        switch (result.code) {
          case 1:
            res.cookie('cart', [])
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

  async getBills(req, res, next) {
    const data = await BillDAO.getBills()
    res.status(200).json(data)
  }

  async confirmBill(req, res, next) {
    const id = req.body.id
    if (id){
      const result = await BillDAO.confirmBill(id)
      switch (result.code) {
        case 1:
          res.status(200).json({ code: 200 });
          break;
        case 0:
          res.status(404).json({ code: 404, message: result.message });
          break;
        case -1:
          res.status(500).json({ code: 500, message: result.message });
          break;
      }
    }else{
      res.status(400).json({code: 400, message: "Đơn hàng không hợp lệ"}) 
    }
  }

  async getMinMaxPrice(req, res, next){
    const priceRange = await ProductDAO.getMinMaxPriceRange()
    res.status(200).json(priceRange) 
  }

  async search(req, res, next) {
    const option = parseSearch(req.query)
    const page = req.query.page
    const result = await ProductDAO.getProductsList(option, 20, 20*(page-1))
    console.log(result)
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

  async getAdress(req, res, next) {
    
  }

  async province(req, res, next){
    const provinces = await AddressDAO.getProvince()
    res.status(200).json({provinces})
  }

  async district(req, res, next) {
    const id = req.params.id;
    if (id){
      const districts = await AddressDAO.getDistrictByProvince(id)
      res.status(200).json({districts})
    }else{
      res.status(400).json({ code: 400, message: "Vui lòng nhập mã Tỉnh/ Thành" });
    }
  }

  async ward(req, res, next) {
    const id = req.params.id;
    if (id){
      const wards = await AddressDAO.getWardByDistrict(id)
      res.status(200).json({wards})
    }else{
      res.status(400).json({ code: 400, message: "Vui lòng nhập mã Tỉnh/ Thành" });
    }
  }
}

module.exports = new APIController();
