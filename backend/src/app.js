const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes'); 
const objectRouter = require('./routes/objectRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/objects', objectRouter);

module.exports = app;
