const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User with this email already exists',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    return res
      .status(201)
      .json({ message: 'User created successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Incorrect password', success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    return (
      res
        .status(200)
        // .cookie('token', token, {
        //   maxAge: 1 * 24 * 60 * 60 * 1000,
        //   httpsOnly: true,
        //   secure: true,
        // })
        .json({
          message: `Welcome back ${user.username}`,
          success: true,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          token,
        })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    return res
      .status(200)
      .json({ message: 'Logged out successfully', success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

module.exports = { signupUser, loginUser, logoutUser };
