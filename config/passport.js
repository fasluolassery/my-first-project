const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // const he = process.env.GOOGLE_CLIENT_ID
      // console.log(he)
      const useremail = profile.emails[0].value;
      const { id, displayName } = profile;

      let user = await User.findOne({ googleId: id });
      if (!user) {
        user = new User({
          username: displayName,
          email: useremail,
          googleId: id,
          phone: 9876543210,
          password: id,
          isVerified: true
        });

        const saving = await user.save();
        console.log('New User Saved:', saving);
      } else {
        console.log('User already exists:', user);
      }

      done(null, user);
    } catch (err) {
      console.error('Google OAuth Error:', err);
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error('Deserialize User Error:', err);
    done(err, null);
  }
});

module.exports = passport;
