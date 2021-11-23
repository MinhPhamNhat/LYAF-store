const ColorDAO = require('../repo/ColorDAO')
const SizeDAO = require('../repo/SizeDAO')
const CategoryDAO = require('../repo/CategoryDAO')
class APIController{
    async getSetupList(req, res, next){
        var colors = await ColorDAO.getList();
        var sizes = await SizeDAO.getList();
        var categories = await CategoryDAO.getList();
        res.status(200).json({colors, sizes, categories})
    }
}

module.exports = new APIController;