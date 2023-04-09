import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
const googleStrategy = GoogleStrategy.Strategy;
const GOOGLE_CALLBACK_URL = "http://localhost:5001/auth/google/callback";
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        token: accessToken,
        googleId: profile.id,
      };

      const user = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((error) => {
        console.log("error signing up", error);
        cb(error, null);
      });
      if (user && user[0]) return cb(null, user && user[0]);
    }
  )
);
passport.serializeUser((user, cb) => {
  console.log("Serializing user", user);
  cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((error) => {
    console.log("Error deserializing", error);
    cb(error, null);
  });
  console.log("Deserialized user", user);
  if (user) cb(null, user);
});
