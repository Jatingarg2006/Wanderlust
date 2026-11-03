const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async(req, res) => {
    if(!req.isAuthenticated()){
        req.flash("success", "You must be logged in to add the review");
        return res.redirect("/login");
    }

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req, res) => {
    if(!req.isAuthenticated()){
        req.flash("success", "You must be logged in to delete the review");
        return res.redirect("/login");
    }

    let {id, reviewId} = req.params;

    let review = await Review.findById(reviewId);

    if(!review.author._id.equals(req.user._id)){
        req.flash("success", "You don't have access to delete this review");
        return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};