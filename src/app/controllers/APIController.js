const ColorDAO = require("../repo/ColorDAO");
const SizeDAO = require("../repo/SizeDAO");
const CategoryDAO = require("../repo/CategoryDAO");
const ProductDAO = require("../repo/ProductDAO");
class APIController {
  async getSetupList(req, res, next) {
    var colors = await ColorDAO.getList();
    var sizes = await SizeDAO.getList();
    var categories = await CategoryDAO.getList();
    res.status(200).json({ colors, sizes, categories });
  }

  async addProduct(req, res, next) {

  }
}

module.exports = new APIController();
