const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./Config/connect');

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Khởi động máy chủ
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
