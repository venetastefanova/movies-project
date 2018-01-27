var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

//creates an array with data for the camps
var data =[
    {
        name:"clouds rest", 
        image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis nibh risus, nec egestas augue porta in. Nulla euismod placerat dolor, ut pharetra massa porta quis. Phasellus ullamcorper eros odio, vitae fringilla mi fermentum sit amet. Nulla consequat semper orci. Maecenas et erat nunc. Praesent pretium viverra lorem, quis vehicula dolor commodo in. Curabitur pulvinar sed lorem non fermentum. Quisque at ligula rutrum, feugiat ante eu, pharetra diam. Morbi euismod massa sed fermentum porttitor. Maecenas non odio commodo, finibus nisl id, aliquam felis. Donec a neque id tortor sollicitudin placerat quis non purus. Vivamus faucibus ante eget tortor feugiat, vel ornare leo egestas. Aenean ut sem ut urna auctor commodo eu at mi. Maecenas quis massa blandit, interdum dolor at, sodales ipsum. Morbi velit nulla, bibendum eget nulla non, faucibus egestas risus. "
    },
    {
        name:"Heaven's gate", 
        image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis nibh risus, nec egestas augue porta in. Nulla euismod placerat dolor, ut pharetra massa porta quis. Phasellus ullamcorper eros odio, vitae fringilla mi fermentum sit amet. Nulla consequat semper orci. Maecenas et erat nunc. Praesent pretium viverra lorem, quis vehicula dolor commodo in. Curabitur pulvinar sed lorem non fermentum. Quisque at ligula rutrum, feugiat ante eu, pharetra diam. Morbi euismod massa sed fermentum porttitor. Maecenas non odio commodo, finibus nisl id, aliquam felis. Donec a neque id tortor sollicitudin placerat quis non purus. Vivamus faucibus ante eget tortor feugiat, vel ornare leo egestas. Aenean ut sem ut urna auctor commodo eu at mi. Maecenas quis massa blandit, interdum dolor at, sodales ipsum. Morbi velit nulla, bibendum eget nulla non, faucibus egestas risus. "
    },
    {
        name:"Desertt Mesa", 
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis nibh risus, nec egestas augue porta in. Nulla euismod placerat dolor, ut pharetra massa porta quis. Phasellus ullamcorper eros odio, vitae fringilla mi fermentum sit amet. Nulla consequat semper orci. Maecenas et erat nunc. Praesent pretium viverra lorem, quis vehicula dolor commodo in. Curabitur pulvinar sed lorem non fermentum. Quisque at ligula rutrum, feugiat ante eu, pharetra diam. Morbi euismod massa sed fermentum porttitor. Maecenas non odio commodo, finibus nisl id, aliquam felis. Donec a neque id tortor sollicitudin placerat quis non purus. Vivamus faucibus ante eget tortor feugiat, vel ornare leo egestas. Aenean ut sem ut urna auctor commodo eu at mi. Maecenas quis massa blandit, interdum dolor at, sodales ipsum. Morbi velit nulla, bibendum eget nulla non, faucibus egestas risus. "
    }
];

function seedDB(){
    // clears the database from campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);           
        }
        console.log("removed campground");
        //loops the array and creates camps from it
        //add a few campgrounds
        data.forEach(function(seed){
             Campground.create(seed,function(err,campground){
                 if(err){
                     console.log(err);
                 }
                 else{
                     console.log("added campground");
                     //create comments
                     Comment.create({
                         text:"this place is great but i wish it had internet",
                         author:"homer"
                     }, function(err,comment){
                         if(err){
                             console.log(err);
                         }
                         else{
                             campground.comments.push(comment);
                             campground.save();
                             console.log("created new comment");

                         }
                     });
                 }
             });    
        });
     
    });
       

    //add a few comments
}


module.exports=seedDB;