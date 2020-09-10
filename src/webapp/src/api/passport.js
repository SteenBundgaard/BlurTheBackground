const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

passport.initialize();
passport.use(
    new FacebookTokenStrategy(
        {
            clientID: '222286185833824',
            clientSecret: process.env.ClientSecret,
            profileFields: [
                'id',
                'displayName',
                'picture.width(200).height(200)',
                'first_name',
                'middle_name',
                'last_name',
                'email',
                'friends'
              ],
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    )
);

module.exports = passport; 