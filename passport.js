const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/User')

const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token
}


passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'komsomolradio'   
},(payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err) {
            return done(err, false)
        }
        if(user) {
            return done(null, user)
        }
        return done(null, false)
    })
}))


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false, {message: "Can't find user with this username"})
        } 
        // User found
        user.comparePassword(password, done)
    })
}))