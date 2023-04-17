// passport-facebook.js
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('../Config/configAPI');
const db = require("../models");
const User = db.users;
module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret: config.facebook_api_secret,
    callbackURL: config.callback_urlfb,
    profileFields: ['id', 'displayName', 'email', 'photos']
  }, function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    process.nextTick(function () {
      User.findOne({ where: { facebookId: profile.id } }).then((user) => {
        if (user) {
          // Người dùng đã tồn tại, cập nhật thông tin trong database
          user.update({
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || '',
            photoUrl: profile.photos?.[0]?.value
          }).then(() => done(null, user))
            .catch((err) => {
              console.error('Error updating user:', err);
              return done(err);
            });
        } else {
          // Người dùng chưa tồn tại, tạo một người dùng mới và lưu thông tin vào database
          const { id, displayName, emails, photos } = profile;
          const email = emails?.[0]?.value || ''; // Lấy địa chỉ email đầu tiên hoặc rỗng nếu không có
          const photoUrl = photos?.[0]?.value;
          User.create({
            facebookId: id,
            email,
            password: "khong_luu_password_khi_login_facebook",
            username : displayName,
            provider: 'facebook',
            providerId: id,
            googleId : 'NO'
          }).then((newUser) => {
            return done(null, newUser);
          }).catch((err) => {
            console.error('Error creating user:', err);
            return done(err);
          });
        }
      }).catch((err) => {
        console.error('Error finding user:', err);
        return done(err);
      });
    });
  }));
};
