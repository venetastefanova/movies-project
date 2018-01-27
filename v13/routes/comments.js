var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // requires it automatically, because index.js is 
//a special name


//shows only if logged in
router.get("/new", middleware.isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground:campground});   
        }
    });
});

//shows only if logged in
router.post("/", middleware.isLoggedIn,function(req,res){
    //lookup campground by using id
    Campground.findById(req.params.id, function(err,campground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //create new comment
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("error", "Something went wrong.");                                  
                }
                else{
                    //add username and id to comment
                    //according to the model made
                    comment.author.id=req.user._id
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");                            
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

//edit comments
router.get("/:comment_id/edit", middleware.checkCommentsOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect("back");
            }
            else{//uses campground_id because we already have it in URL route
                res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
                
            }
        });
    
    });
    
});

//update comment
router.put("/:comment_id/", middleware.checkCommentsOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" +req.params.id);
        }
    });
});
//delete comment
router.delete("/:comment_id", middleware.checkCommentsOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment deleted.");                                                
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;