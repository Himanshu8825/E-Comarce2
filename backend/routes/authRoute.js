const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', signupUser);
authRouter.post('/signin', loginUser);

module.exports = authRouter;
