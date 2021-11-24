const ColorDAO = require("../repo/ColorDAO");
const SizeDAO = require("../repo/SizeDAO");
const CategoryDAO = require("../repo/CategoryDAO");
const ProductDAO = require("../repo/ProductDAO");
const { validationResult } = require("express-validator")
const cloudinary = require('../../config/cloudinary')
class APIController {
  async getSetupList(req, res, next) {
    var colors = await ColorDAO.getList();
    var sizes = await SizeDAO.getList();
    var categories = await CategoryDAO.getList();
    res.status(200).json({ colors, sizes, categories });
  }

  async addProduct(req, res, next) {
    console.log(cloudinary.images('samples/sheep.jpg', {aspect_ratio: "1.1", background: "auto", crop: "pad"}))
    console.log(req.body)
  }
}

module.exports = new APIController();
