const models = require("../models");
Category = models.Category;

module.exports = {
  categories: async () => {
    return await Category.findAll({
      attributes: ["id", "name"],
    });
  },
};
