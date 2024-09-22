const Feature = require('../../models/Features');

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featureImage = new Feature({
      image,
    });

    await featureImage.save();

    return res.status(200).json({
      message: 'Feature image added successfully',
      success: true,
      data: featureImage,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Couldn't add feature image ", success: false });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find();

    if (!images) {
      return res
        .status(404)
        .json({ message: 'No feature images found', success: false });
    }

    return res.status(200).json({
      message: 'Feature images fetched successfully',
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Couldn't get feature images ", success: false });
  }
};


module.exports = {addFeatureImage , getFeatureImages}
