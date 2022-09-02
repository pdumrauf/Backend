const { verifyPassword, hashedPassword } = require("../src/passwordValidation");
const { users } = require("../daos")();
const { Strategy: LocalStrategy } = require("passport-local");
const sendEmail = require("../src/sendEmail");

const initialize = (passport) => {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" }, async (email, password, done) => {
                try {
                    const user = await users.getByEmail(email)
                    if (!user)
                        return done(null, false, {
                            message: "User not found",
                        });

                    if (!verifyPassword(password, user))
                        return done(null, false, {
                            message: "Incorrect password",
                        });

                    return done(null, user);
                } catch (e) {
                    return done(e);
                }
            }
        )
    );

    /*passReqToCallback option to true. 
    With this option enabled, req will be passed as the first argument to the verify callback.
    Added req as a parameter because if not it shows that "done" is not a function*/

    passport.use(
        "register",
        new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
            try {
                const user = await users.getByEmail(email)
                if (user)
                    return done(null, false, {
                        message: "Username already exists.",
                    });

                const newUser = {
                    email: req.body.email,
                    password: hashedPassword(password),
                    age: req.body.age,
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    photo_url: req.file.filename,
                };
                //req.file admitted thanks to multer lib for avatars

                const response = await users.createItem(newUser);
                await sendEmail(process.env.ADMIN_EMAIL, "New register", JSON.stringify(newUser, null, 2));
                return done(null, response);
            } catch (e) {
                return done(e);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        const user = await users.getItemById(id)
        done(null, user);
    });
};

module.exports = initialize;
