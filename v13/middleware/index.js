
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

//all the middleware goes here
var middlewareObj = {};

//middleware to check if the user owns the campground
middlewareObj.checkUserOwnership = function(req,res,next){
    //is user logged in at all
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err || !foundUser){ // handles error not to cause app to break
                req.flash("error", "User not found");
                res.redirect("back");
            }
            else{
            //does user own the user?
            //one is object, the other is string, so we use equals to compare them
                if(foundUser._id.equals(req.user._id) && foundUser){ 
                //  res.render("campgrounds/edit",{foundCampground: foundCampground});                            
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");                                                     
                    res.redirect("/campgrounds");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");        
        res.redirect("/login");
    }

}

//middleware to check if the user owns the campground
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    //is user logged in at all
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){ // handles error not to cause app to break
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else{
            //does user own the campground?
            //one is object, the other is string, so we use equals to compare them
                if(foundCampground.author.id.equals(req.user._id)||req.user.isAdmin){ 
                //  res.render("campgrounds/edit",{foundCampground: foundCampground});                            
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");                                                     
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");        
        res.redirect("/login");
    }

}

//middleware to check if the user owns the campground
middlewareObj.checkCommentsOwnership= function(req,res,next){
    //is user logged in at all
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Campground not found.");             
                res.redirect("back");
            }
            else{
            //does user own the comment?
            //one is object, the other is string, so we use equals to compare them
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){ 
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");                                 
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }

}

//CHECKS IF LOGGED IN
middlewareObj.isLoggedIn= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You need to be loged in to do that!"); 
        res.redirect("/login");
    }
}
module.exports = middlewareObj;