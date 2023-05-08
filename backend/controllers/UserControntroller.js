const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
const path = require('path');
const multer = require('multer');
const User = db.users;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

//register user
const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    address,
    phone
  } = req.body;

  try {
    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = await User.findOne({
      where: {
        email
      }
    });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email đã tồn tại trong hệ thống'
      });
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
      googleId: 'không sử dụng',
      facebookId: 'không sử dụng',
      provider: 'rỗng',
      providerId: 'rỗng'
    });

    res.json({
      user,
      message: "Đăng ký tài khoản thành công!"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Đăng ký thất bại'
    });
  }
};
//login user
const loginUser = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    // Tìm kiếm khách hàng với email cung cấp
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(400).json({
        error: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }
    // So sánh mật khẩu được cung cấp với mật khẩu đã được mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT
    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
    // Trả về JWT và thông tin người dùng
    res.json({
      id: user.id,
      googleId: user.googleId,
      facebookId: user.facebookId,
      provider: user.provider,
      providerId: user.providerId,
      username: user.username,
      email: user.email,
      password: "do_not_save_password_when_login_with_google",
      address: user.address,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Đăng nhập thất bại'
    });
    console.log("loi" + error)
  }
};
//test api
const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    res.json("không lấy được khách hàng" + error);
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        message: `User with id ${userId} not found.`
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user with id " + userId
    });
  }
};
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(req.body);
  const {
    username,
    address,
    phone,
    password
  } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        message: `User with id ${userId} not found.`
      });
    } else {
      let hashedPassword = user.hashedPassword;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      await user.update({
        name: username || user.name,
        address: address || user.address,
        phone: phone || user.phone,
        password: hashedPassword
      });

      res.json({
        message: `User with id ${userId} has been updated successfully.`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating user with id " + userId
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUserById,

};