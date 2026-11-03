const express = require("express");
const router = express.Router({mergeParams: true});
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const reviewController = require("../controllers/reviews.js");

//Post Review Route
router.post("/", reviewController.createReview);

//Delete Review Route
router.delete("/:reviewId", reviewController.destroyReview);

module.exports = router;