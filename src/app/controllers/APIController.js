const ProductDAO = require("../repo/ProductDAO");
const ColorDAO = require("../repo/ColorDAO");
const SizeDAO = require("../repo/SizeDAO");
const CategoryDAO = require("../repo/CategoryDAO");
const { validationResult } = require("express-validator");
const { getPayload } = require("../../helper/function");
class APIController {
  async getSetupList(req, res, next) {
    var colors = await ColorDAO.getList();
    var sizes = await SizeDAO.getList();
    var categories = await CategoryDAO.getList();
    res.status(200).json({ colors, sizes, categories });
  }

  async addProduct(req, res, next) {
    const validate = validationResult(req);
    if (validate.errors.length) {
      let errors = validate.mapped();
      res.status(400).json({ errors });
    } else {
      var payload = await getPayload(req);
      if (payload.code!==1) {
        res.status(payload.code==0?400:500).json({
          errors: {
            images: {
              msg: payload.message,
              param: "images",
            },
          },
        });
      } else{
        var product = await ProductDAO.createNew(payload.data);
        switch (product.code) {
          case 1:
            res.status(200).json({ code: 200, productId: product._id });
            break;
          case -1:
            res.status(500).json({ code: 500, message: product.message });
            break;
        }
      }
    }
  }
}

module.exports = new APIController();
