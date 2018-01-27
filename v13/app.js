var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require("connect-flash");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride =require("method-override");
var User = require("./models/user");
app.locals.moment = require("moment"); // moment is available to be used everywhere with just "moment"



//requiring routes
var commonRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index"),
    userRoutes = require("./routes/users");

//seedDB();
//DB connection
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method"));
app.use(flash()); // uses the flash messages

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Veneta is awesome!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passes currentUser,error,success to all routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.get('/', function(req,res){
    res.render("landing");
});


//uses the routes files
//appends the route to these variables. so we cleen up the files itself
app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commonRoutes);
app.use("/",userRoutes);




app.listen(3000, function(){
    console.log('The server is running on port 3000');
});