const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'User Not Authenticated', success: false });
  }
  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verify) {
      return res
        .status(403)
        .json({ message: 'Invalid token.....', success: false });
    }

    req.user = verify;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Server error', success: false });
  }
};


module.exports = isAuthenticated;
