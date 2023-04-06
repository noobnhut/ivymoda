const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const config = require('../Config/configAPI.js');
const {User} = require("../models");

module.exports = function(passport) {
    // Passport Google Strategy code goes here
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.callback_urlgg
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({ where: { googleId: profile.id } }).then((user) => {
            if (user) {
                // User already exists, update their information in the database
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
                // User doesn't exist, create a new user and save their information to the database
                const { id, displayName, emails, photos } = profile;
                const email = emails?.[0]?.value || ''; // Get the first email address or empty string if none exists
                const photoUrl = photos?.[0]?.value;
                User.create({
                    googleId: id,
                    email,
                    password: "khong_luu_password_khi_login_google",
                    displayName,
                    provider: 'google',
                    providerId: id,
                    photoUrl
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
    }));
};
