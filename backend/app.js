const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./Config/connect');
//asdfasdfasdfasdfasdfasdfasdf
// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// test pull
// Khởi động máy chủ
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
