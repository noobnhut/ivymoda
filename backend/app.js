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
const {routerColor} = require('./routes/ColorRouter');
const {routerSize} = require('./routes/SizeRouter');
const {routerImg} = require('./routes/ImgRouter');
const {routerRender} = require('./routes/renderRouter');
const {routerFollow} = require('./routes/FollowRouter');
const routerMomo = require('./routes/MomoRouter');
const routerCheckout = require('./routes/CheckoutRouter');
const routerAmin = require('./routes/AdminRouter');
//mail
const {routerMail} = require('./routes/MailRouter')
const router = require('./routes/UserRouterAPI');

// Passport session setup. 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//facebook, google
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

// Sử dụng passport và express.json middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Định tuyến
app.use(routerUser);
app.use(routerCat);
app.use(routerSex);
app.use(routerCatSex);
app.use(routerProduct);
app.use(routerColor);
app.use(routerSize);
app.use(router);
app.use(routerImg);
app.use(routerRender);
app.use(routerFollow);
app.use(routerMomo);
app.use(routerCheckout);
app.use(routerAmin);
// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));

app.use(routerMail);

const CryptoJS = require('crypto-js') 

// ...

// const password = 'admin'
// const hash = CryptoJS.SHA256(password).toString()
// console.log(hash)
// 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
// Khởi động máy chủ



// function generateVerificationCode() {
//   const min = 100000;
//   const max = 999999;
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const verificationCode = generateVerificationCode();
// console.log(verificationCode); 

const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
