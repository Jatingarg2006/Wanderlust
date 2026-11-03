const express = require("express");
const router = express.Router({mergeParams: true});
const {listingSchema, reviewSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(listingController.index)
    .post(upload.single('listing[image]') ,listingController.createListing);

//New Route
router.get("/new", listingController.renderNewForm);

router.route("/:id")
  .get(listingController.showListing)
  .put(upload.single('listing[image]') , listingController.updateListing)
  .delete(listingController.destroyListing);

//edit route
router.get("/:id/edit", listingController.renderEditForm);

module.exports = router;