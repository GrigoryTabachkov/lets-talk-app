const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// console.log(process.env.HOST)
mongoose.connect('mongodb+srv://user1:1q2w3e@cluster0-x9olz.mongodb.net/WorkBook?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
const methodOverride = require('method-override');
const Router1 = require('./router/Router1');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: false,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use('/', Router1);

module.exports = app;
