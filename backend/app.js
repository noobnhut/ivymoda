const session  = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors  = require("cors");
require('./Config/connect');
const app = express();

//router
const {routerUser} = require('./routes/UserRouter');
const {routerCat} = require('./routes/CatRouter');
const {routerSex} = require('./routes/SexRouter');

const {routerCatSex} = require('./routes/CatSexRouter');


// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
//session 
app.use(session({
  secret: 'keysaveloginuser123456', 
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(express.json());
app.use(routerUser);
app.use(routerCat,routerSex,routerCatSex);
app.use(express.static("uploads"));

// Khởi động máy chủ
const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
