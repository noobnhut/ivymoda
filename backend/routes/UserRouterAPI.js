  const express = require('express');
  const router = express.Router();
  const passport = require('passport');
  const dotenv = require ( 'dotenv');
  dotenv.config();
  const jwt = require('jsonwebtoken');
  const LocalStorage = require('node-localstorage').LocalStorage;
  const localStorage = new LocalStorage('./localStorage');


  //url trang chủ `${process.env.VITE_API_BASE_URL_API}` = 5173
  router.get('/', function(req, res) {
    res.json({ message: 'Welcome to my API.' });
  });

  router.get('/login', function(req, res) {});

 // Xử lý đăng nhập
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/customer/login' }),
  function(req, res) {
    // Lưu thông tin người dùng vào session
    const token = generateToken(req.user);
    const user = req.user;

    const redirectUrl = `${process.env.VITE_API_BASE_URL_API}?token_fb=${token}&user_inf_fb=${JSON.stringify(user)}`;
    res.redirect(redirectUrl);
  }
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/customer/login' }),
  function(req, res) {
    // Lưu thông tin người dùng vào session
    const token = generateToken(req.user);
    const user = req.user;

    const redirectUrl = `${process.env.VITE_API_BASE_URL_API}?token_gg=${token}&user_inf_gg=${JSON.stringify(user)}`;
    res.redirect(redirectUrl);
  }
);

// Xử lý đăng xuất
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Xác thực người dùng
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized.' });
}

function generateToken(user) {
  const payload = { id: user.id };
  const secret = 'mysecretkey'; // Replace with your own secret key
  const options = { expiresIn: '1d' }; // Token expires in 1 day
  return jwt.sign(payload, secret, options);
}

module.exports = router;