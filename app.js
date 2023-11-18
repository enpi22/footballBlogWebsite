//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "Below is where I bullstuff about Football.";
const aboutContent = "Just a football enthusiast.";
const contactContent = "Mail me at reddyharshit8@gmail.com, and I do not know if I'll reply back though, lol";

const app = express();

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
}
const userSchema = {
  username: String,
  password: String
}
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema); //this is like your class

var isUser = false;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


async function isUserAuthenticated(req) {
  const username = req.body.uname; 
  const psw = req.body.psw;

  try {
    // Attempt to find the user in the 'users' collection by username
    const user = await User.findOne({ username: username });
    const pass = await User.findOne({password:psw});

    if(user && pass){
      return !!user;
    }
  } catch (error) {
    console.error("Error checking user authentication:", error);
    return false; // An error occurred, user is not authenticated
  }
}



app.get("/", async function(req, res){
  const posts = await Post.find({}).sort({ _id: -1 });
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/whfc", function(req, res){
  res.render("whfc");
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  if (isUser) {
    res.render("compose");
  } else {
    res.redirect("/user");
  }
});

app.post("/user", async function(req, res) {
  if (await isUserAuthenticated(req)) {
    isUser = true; 
    res.redirect("/compose");
  } else {
    res.redirect("/user"); 
  }
});


app.post("/compose", async function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  const suc = await post.save();
  if (suc){
    res.redirect("/");
  }
  else{
    res.redirect("/compose")
  }

});

app.get("/user", function(req, res){
  res.render("user");
})

app.get("/posts/:postId", async function(req, res){
  const requestedPostId = (req.params.postId);

  const post = await Post.findOne({_id: requestedPostId});
    if (post) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
