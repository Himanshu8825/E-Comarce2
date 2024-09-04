const express = require('express');
const {
  signupUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const authRouter = express.Router();

authRouter.post('/signup', signupUser);
authRouter.post('/signin', loginUser);
authRouter.post('/logout', logoutUser);

authRouter.get('/check-auth', isAuthenticated, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: 'Authenticated user!',
    user,
  });
});

module.exports = authRouter;
