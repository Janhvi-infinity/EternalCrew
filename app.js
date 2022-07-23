const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const cors = require('cors')


const app = express();
const port = 3002;

require('dotenv').config();

// middlewares that are used
app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cors())
app.use(express.json())

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());



app.set('layout', './layouts/main');

app.set('view engine', 'ejs');
const routes = require('./server/routes/projectRoutes.js')
app.use('/', routes );

app.listen(port, () => {
    console.log(`Listening to port no ${port}`)
})