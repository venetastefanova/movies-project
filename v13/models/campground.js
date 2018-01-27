var mongoose = require("mongoose");

// SCHEMA 
var campgroundSchema = new mongoose.Schema({
    name: String,
    price:String,
    image: String,
    description: String,
    createdOn: {type: Date, default:Date.now},
    //whenCampground is created, it shows author
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    //association between the two collections "commentd" and "cammpgrounds"
    comments: [ //fixed the error that 'push' is a propert of indentified
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports =mongoose.model("Campground", campgroundSchema);

