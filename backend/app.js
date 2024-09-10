require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/DB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/Admin/productRoute');
const shopRouter = require('./routes/Shopping/ShopProductRoute');

const app = express();

const port = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//!middilewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//!Route
app.use('/auth', authRouter);
app.use('/admin/products', productRouter);
app.use('/shop/products', shopRouter);

//!DB Connection
connectDB();

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
