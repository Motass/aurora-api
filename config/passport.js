"use strict";

const userService = require('../services/userService');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function (passport) {

    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            let user = await userService.login(email, password).catch(e => {
                return done(null, false, {message: e.message});
            });
            return done(null, user._doc);
        }
    ));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY
        },
        (payload, done) => {
            return done(null, payload);
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};