const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require ( 'dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');


//url trang chủ `${process.env.VITE_API_BASE_URL_API}` = 5173
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to my API.' });
});

router.get('/login', function(req, res) {});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/customer/login' }),
  function(req, res) {
    const token_fb = generateToken(req.user);
    const user_info_fb = req.user;
    const redirectUrl = `${process.env.VITE_API_BASE_URL_API}`;
    // Lưu thông tin người dùng vào cookies
    res.cookie('token_fb', token_fb, { maxAge: 86400000 }); // Cookie hết hạn sau 1 ngày
    res.cookie('user_info_fb', JSON.stringify(user_info_fb), { maxAge: 86400000 });
    res.redirect(redirectUrl);
  }
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/customer/login' }),
  function(req, res) {
    const token_google = generateToken(req.user);
    const user_info_google = req.user;
    const redirectUrl = `${process.env.VITE_API_BASE_URL_API}`;
    // Lưu thông tin người dùng vào cookies
    res.cookie('token_google', token_google, { maxAge: 86400000 }); // Cookie hết hạn sau 1 ngày
    res.cookie('user_info_google', JSON.stringify(user_info_google), { maxAge: 86400000 });
    res.redirect(redirectUrl);
  }
);

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
