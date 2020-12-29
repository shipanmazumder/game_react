const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const fs = require('fs')
const Users = require('./models/Users')

var privateKey = fs.readFileSync("./jwtRS256.key");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = privateKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        Users.findOne({ _id: payload.data._id })
            .then(user => {
                if (!user) {
                    return done(null, false) 
                } else {
                    return done(null, user)
                }
            })
            .catch(error => {
                return done(error)
            })
    }))
}