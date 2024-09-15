const Address = require('../../models/Address');

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    return res.status(201).json({
      message: 'Address created successfully',
      success: true,
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error creating address', success: false });
  }
};

const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'User ID is required', success: false });
    }

    const addresses = await Address.find({ userId }); // Changed from findOne to find

    if (addresses.length === 0) {
      return res
        .status(404)
        .json({ message: 'No addresses found', success: false });
    }

    return res.status(200).json({
      message: 'Addresses fetched successfully',
      success: true,
      data: addresses, // Send the array of addresses
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while fetching addresses', success: false });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res
        .status(404)
        .json({ message: 'UserId and addressId are required', success: false });
    }

    const address = await Address.findOneAndUpdate(
      { userId, _id: addressId },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ message: 'Address not found', success: false });
    }

    return res.status(200).json({
      message: 'Address updated successfully',
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while editing address', success: false });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res
        .status(404)
        .json({ message: 'UserId and addressId are required', success: false });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res
        .status(404)
        .json({ message: 'Address not found', success: false });
    }

    return res.status(200).json({
      message: 'Address deleted successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while deleting address', success: false });
  }
};

module.exports = { addAddress, fetchAddress, editAddress, deleteAddress };
