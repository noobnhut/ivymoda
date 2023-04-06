const session  = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const cors  = require("cors");
require('./Config/connect');
const app = express();

const {routerUser} = require('./routes/UserRouter');
const {routerCat} = require('./routes/CatRouter');
const {routerSex} = require('./routes/SexRouter');
const {routerCatSex} = require('./routes/CatSexRouter');
const {routerProduct} = require('./routes/ProductRouter');
const {routerDetail} = require('./routes/DetailRouter');
const router = require('./routes/UserRouterAPI');
// Passport session setup. 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
require('./passport/passport-facebook')(passport);
require('./passport/passport-google')(passport);

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
//session 
app.use(session({
  secret: 'keysaveloginuser123456', 
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser()); //Parse cookie
app.use(cors());

app.use(express.json());
app.use(routerUser,routerCat,routerSex,routerCatSex,routerProduct,routerDetail,router);
app.use(express.static("uploads"));
app.use(passport.initialize());
app.use(passport.session());
// Khởi động máy chủ
const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
