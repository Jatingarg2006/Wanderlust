const Review = require("../models/review");
const Listing = require("../models/listing");
const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "Welcome to Wanderlust");
        return res.redirect("/listings");
    });
};

module.exports.renderLoginForm = (req,res) =>{
    res.render("users/login.ejs", {message: req.flash("success")});
};

module.exports.login = (req,res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect("/listings");
};

module.exports.logout = (req,res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
};
