const { verifyPassword, createHash } = require("../src/isValidPassword");
const User = require("../models/User");
const { Strategy: LocalStrategy } = require("passport-local");

initialize = (passport) => {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },

            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email });
                    if (!user)
                        return done(null, false, {
                            message: "User not found",
                        });

                    if (!verifyPassword(password, user))
                        return done(null, false, {
                            message: "Incorrect password",
                        });

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.use(
        "register",
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (user)
                    return done(null, false, {
                        message: "El nombre de usuario ya esta en uso.",
                    });

                const newUser = new User({
                    email,
                    password: createHash(password),
                });
                await newUser.save();
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};

module.exports = initialize;
