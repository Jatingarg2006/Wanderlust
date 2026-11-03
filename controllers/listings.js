const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken  = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
    try {
        const allListings = await Listing.find({});
        res.render("./listings/index.ejs", {
            allListings, 
            message: req.flash("success"),
            currentUser: req.user
        });
    }
    catch(err) {
        next(err);
    }
};

module.exports.renderNewForm = (req, res, next) => {
    try{
        if(!req.isAuthenticated()){
            req.flash("success", "you must be logged in to create listing!");
            return res.redirect("/login");
        }
        res.render("./listings/newList.ejs");
    }
    catch(err){
        next(err);
    }
};

module.exports.showListing = async (req,res,next) => {
    try{
        let {id} = req.params;
        const one = await Listing.findById(id).populate({
            path: "reviews", populate: {path: "author"}})
            .populate("owner");
        if(!one){
            res.send("Listing does not Exist!");
            next(err);
        }
        
        res.render("./listings/listData.ejs", {one, message: req.flash("success"), currUser: req.user});
    }
    catch(err){
        next(err);
    }
};

module.exports.createListing = async (req, res, next) => { 
    try { 
        let {title, description, price, location, country, image} = req.body;
        let map_location = location;
        
        let response = await geocodingClient.forwardGeocode({ 
            query: map_location, 
            limit: 1 
        }) .send(); 
        
        console.log(response);
        
        if(!req.isAuthenticated()){ 
            req.flash("success", "You must be logged in to create the listing"); 
            return res.redirect("/login"); 
        } 
        
        let url = req.file.path; 
        let filename = req.file.filename; 
        
        const newListData = new Listing({ 
            title: title, 
            description: description, 
            price: price, 
            location: location, 
            country: country, 
            image: image, 
            owner: req.user._id, 
        }) 
        
        newListData.image = {url, filename};

        newListData.geometry = response.body.features[0].geometry;
         
        await newListData.save(); 
        
        req.flash("success", "New Listing Created!"); 
        res.redirect("/listings"); 
    } catch(err){ 
        next(err); 
    } 
};


module.exports.renderEditForm = async (req, res, next) => {
    try{

    if(!req.isAuthenticated()){
        req.flash("success", "You must be logged in to edit the listing");
        return res.redirect("/login");
    }

        let {id} = req.params;
        const one = await Listing.findById(id);

        let originalImageUrl= one.image.url;
        originalImageUrl.replace("/upload", "/upload/h_300,w_250");
        res.render("./listings/edit.ejs", {one, originalImageUrl});
    }

    catch(err){
        next(err);
    }
};

module.exports.updateListing = async (req, res, next) => {
    try{

        if(!req.isAuthenticated()){
            req.flash("success", "You must be logged in to update the listing");
            return res.redirect("/login");
        }

        let {id} = req.params;
        let {title, description, price, location, country} = req.body;

        let listing = await Listing.findById(id);
        
        if(!listing.owner._id.equals(req.user._id)){
            req.flash("success", "you don't have permission to edit");
            return res.redirect(`/listings/${id}`);
        }
        let updatedListing = await Listing.findByIdAndUpdate(id, {title, description, price, location, country});
        
        if(typeof req.file !== "undefined"){
            updatedListing.image = { url: req.file.path, filename: req.file.filename };
            await updatedListing.save();
        }

        res.redirect("/listings");
    }
    catch(err){
        next(err);
    }
};

module.exports.destroyListing = async (req, res, next) => {
    try{

        if(!req.isAuthenticated()){
            req.flash("success", "You must be logged in to delete the listing");
            return res.redirect("/login");
        }

        let {id} = req.params;

        let listing = await Listing.findById(id);
        
        if(!listing.owner._id.equals(req.user._id)){
            req.flash("success", "you don't have permission to delete");
            return res.redirect(`/listings/${id}`);
        }

        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    }
    catch(err){
        next(err);
    }
};