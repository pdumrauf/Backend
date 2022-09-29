const { Router } = require("express");
const passport = require("passport");
const authRouter = new Router();
const { isAuthenticated, isNotAuthenticated } = require("../middleware/authenticate");

authRouter.get("/login", isNotAuthenticated, (_req, res) => {
    return res.render("partials/login");
});

authRouter.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })
);

authRouter.get("/register", isNotAuthenticated, (_req, res) => {
    return res.render("partials/register");
});

authRouter.post(
    "/register",
    passport.authenticate("register", {
        successRedirect: "/",
        failureRedirect: "/auth/register",
        failureFlash: true,
    })
);

authRouter.get("/logout", isAuthenticated, (req, res, next) => {
    const email = req.user.email;
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        return res.render("partials/logout", { email });
    });
});

module.exports = authRouter;