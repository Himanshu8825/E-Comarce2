require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/DB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/Admin/productRoute');
const shopRouter = require('./routes/Shopping/ShopProductRoute');
const cartRouter = require('./routes/Shopping/CartRoute');
const addressRouter = require('./routes/Shopping/AddressRoute');
const orderRouter = require('./routes/Shopping/OrderRoute');
const adminOrderRouter = require('./routes/Admin/adminOrderRoutes');
const searchRouter = require('./routes/Shopping/searchRoute');
const reviewRouter = require('./routes/Shopping/ReviewRoute');

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

//!Routes
//Auth routes
app.use('/auth', authRouter);

//Admin routes
app.use('/admin/products', productRouter);
app.use('/admin/orders', adminOrderRouter);

//Shopping routes
app.use('/shop/products', shopRouter);
app.use('/shop/cart', cartRouter);
app.use('/shop/address', addressRouter);
app.use('/shop/order', orderRouter);
app.use('/shop/search', searchRouter);
app.use('/shop/review', reviewRouter);

//!DB Connection
connectDB();

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
