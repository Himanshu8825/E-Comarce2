const { imageUploadUtils } = require('../../helpers/cloudinary');

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await imageUploadUtils(url);

    return res.status(200).json({
      message: 'Image uploaded successfully',
      result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error uploading image', success: false });
  }
};


module.exports = {handleImageUpload}
