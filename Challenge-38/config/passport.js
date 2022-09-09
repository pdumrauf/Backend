const { verifyPassword } = require("../src/isValidPassword");
const User = require("../models/User");
const UserService = require("../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const { Strategy: LocalStrategy } = require("passport-local");

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

const initialize = (passport) => {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },

            async (email, password, done) => {
                try {
                    const user = await userService.getUserByEmail(email);
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
                const user = await userService.getUserByEmail(email);
                if (user)
                    return done(null, false, {
                        message: "Username already in use.",
                    });

                const newUser = await userService.createUser({ email, password });
                console.log(newUser)
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};

module.exports = initialize;
