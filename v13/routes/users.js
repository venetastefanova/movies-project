var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware"); // requires it automatically, because index.js is 
//a special name


//USER PROFILE
router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "User not found");
            res.redirect("/");
        }
        else{
            Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
                if(err){
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                }
                else{
                    res.render("users/show", {user:foundUser, campgrounds:campgrounds});                    
                }
            });
        }
    });
});

//edit user route
router.get("/users/:id/edit", middleware.checkUserOwnership, function(req,res){
    User.findById(req.params.id, function(err, foundUser){           
        if(err || !foundUser) req.flash("error", "User not found.");                           
        res.redirect("/");                               
    });   
});

//SHOW MY PROFILE
router.get("/my-profile/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "User not found");
            res.redirect("/");
        }
        else{
            Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
                if(err){
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                }
                else{
                    res.render("users/my-profile", {user:foundUser, campgrounds:campgrounds});                    
                }
            });
        }
    });
});    

//edit user route
router.get("/my-profile/:id/edit", middleware.checkUserOwnership, function(req,res){
    User.findById(req.params.id, function(err, foundUser){           
        if(err) req.flash("error", "User not found.");                           
        res.render("users/edit",{foundUser: foundUser});                               
    });   
});

//update user profileroute
router.put("/my-profile/:id", middleware.checkUserOwnership, function(req,res){
    //find and update the correct campground
      User.findByIdAndUpdate(req.params.id, req.body.user, function(err,updatedUser){
          if(err){
              res.redirect("/campgrounds");
          }
          else{
              console.log(updatedUser);
              res.redirect("/my-profile/"+ req.params.id);
          }
      });
  });


module.exports = router;