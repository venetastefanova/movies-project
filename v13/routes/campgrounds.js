
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); // requires it automatically, because index.js is 
//a special name

//INDEX  -just shows all campgrounds
router.get('/', function(req,res){
    //console.log(req.user); //undefined if not logged in
//get all campgrounds from DB 
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{ // in campgrounds.ejs  gets allcampground from database and assigns
            //it to the campgrounds variable
            res.render("campgrounds/index", {campgrounds : allCampgrounds, page: 'campgrounds'});
        }
    });
});

//CREATE =same url but makinga new campground and redirecting to the campgrounds
router.post("/",middleware.isLoggedIn, function (req,res){
    //get data from form and add to campgrounds array
    var name=req.body.name;
    var price =req.body.price;
    var image=req.body.image;
    var description =req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, image:image, price:price, description:description, author:author};
    
    //create a new campground and save to db
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });

});

//NEW - it shows the form for the logic
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW -shows more info about our campground
router.get("/:id", function(req, res){
    //find a campgroun by id   
    //populates the comments by id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground){ //handles error not to cause a break in the app
            req.flash("error", "Campground not found.");
            res.redirect("back");
            //console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});           
        }
    });
    //render the content of it
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){           
            if(err) req.flash("error", "Campground not found.");                           
            res.render("campgrounds/edit",{foundCampground: foundCampground});                               
        });   
});
//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//delete campground
router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});
module.exports = router;