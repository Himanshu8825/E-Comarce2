const Product = require('../../models/Product');

const searchproducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== 'string') {
      return res
        .status(400)
        .json({ message: 'Invalid keyword', success: false });
    }

    const regEx = new RegExp(keyword, 'i');

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResult = await Product.find(createSearchQuery);

    return res.status(200).json({ success: true, data: searchResult });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', success: false });
  }
};


module.exports = searchproducts;
