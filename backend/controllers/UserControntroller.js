const bcrypt = require ( 'bcryptjs');
const jwt = require ( 'jsonwebtoken');
const dotenv = require ( 'dotenv');
const db = require('../models');
const path = require('path');
const multer = require('multer');
const User = db.users;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

//register user
 const registerUser = async (req, res) => {
    const { username,email, password ,address, phone } = req.body;
  
    try {
      // Kiểm tra xem email đã được sử dụng chưa
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email đã tồn tại trong hệ thống' });
      }
  
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Tạo một user mới
      const user = await User.create({
        email,
        password: hashedPassword, // Lưu mật khẩu đã mã hóa vào cơ sở dữ liệu
        username,
        address,
        phone,
        avatar :"default",
        url_avatar : "default_url",
      });
  
      res.json({ user, message: "Đăng ký tài khoản thành công!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Đăng ký thất bại' });
    }
};

//login user
 const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Tìm kiếm khách hàng với email cung cấp
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không đúng' });
      }
      // So sánh mật khẩu được cung cấp với mật khẩu đã được mã hóa
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không đúng' });
      }
  
      // Tạo JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
      // Trả về JWT và thông tin người dùng
      res.json({ user, token });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Đăng nhập thất bại' });
      console.log("loi" + error)
    }
};

//test api
const getAllUser = async(req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        res.json("không lấy được khách hàng"+ error);
        console.log(error);
    }  
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/'); // Thư mục lưu trữ file upload
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Đổi tên file để tránh trùng lặp
  }
});

// Khởi tạo middleware multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 30000000 } // Giới hạn dung lượng file upload (ở đây là 1MB)
}).single('avatar');

const addUser = async (req, res) => {
  // Xử lý upload file
  upload(req, res, async (err) => {
    if (err) {
      // Lỗi khi upload file
      return res.status(500).json({ message: 'Lỗi khi upload file', error: err });
    } else {
      // Thành công khi upload file
      const avatar = req.file.filename;  
      const url_avatar = `https://localhost:3000/${avatar}`;     
      return res.status(200).json({ message: 'upload file xong' });
      
    }
  });
};


module.exports = { 
    registerUser,
    loginUser,
    getAllUser,
    addUser
   
   
};
