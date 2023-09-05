const categoryRepository = require("../repositories/category.repository");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryRepository.categories();
      res
        .status(200)
        .json({ message: "Categories founds successfully", categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
