const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_SECRET) {

  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')

} else {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'https://localhost:8080/auth/facebook/callback'
  },
    function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate(..., function(err, user) {
      //     if (err) { return done(err); }
      //     done(null, user);
      //   }
      // );
      console.log(profile)
    }
  ));

  router.get('/', passport.authenticate('facebook'));

  router.get('/callback', passport.authenticate('facebook',
    {
      successRedirect: '/home',
      failiureRedirect: '/callback'
    }))
}
