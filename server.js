// TAKE A SCREENSHOT OF THIS AND EXPLAIN IT IN THE TUTORAL

// Requiring necessary npm packages
// WHY DO YOU HAVE TO REQUIRE THESE? 
// WHAT DOES EXPRESS DO?
// It's necessary to make html servers and api., IT'S A PRE-BUILT FRAMEWORK for node. It is used for designing and building web aplications. works with node.js. You need to know HTML and JS. It makes Node work better and faster.
var express = require("express");
// What is express session? It differentiates between users. Easch user has a secret key. 
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
// A port is a communication endpoint. If you are online, the environment (such as Heroku or wherever your site is deployed will set the port). If you are testing your site locally, you can set the port. In this case, it'll be 8080. 
var PORT = process.env.PORT || 8080;
// This is a pointer to the models folder where you will find information necessary (the data tables) to run the application.
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
// This is a pointer saying that we will be using express.
var app = express();
// This is necessary because if you don't it will be returned as undefined. This takes data in as a string or an array and returns it as an object.
app.use(express.urlencoded({ extended: true }));
// This is a built in method that takes the data as an object and returns and object. Having both this and urlecoded allows us to expand the kinds of data we can read.
app.use(express.json());
// This is a path to the public folder which holds client side information.
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status\\ This is referring to the express-session. 
// THIS IS WHERE WE CONFIGURE THE EXPRESS SESSION. WE NEED A SECRET KEY SO THAT DATA  IS NOT USED MALICIOUSLY. THE OTHERS ARE CONFIGURATION OPTIONS TO DETERMINE HOW THE DATA WILL BE STORED. saveUnitialized: stores the requested object into a session database (if it's true. if its false it wont be saved.). RESAVE: Tells the store that that the session is still active because some stores will end or delete idle unused sessions after some time. 
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// Middleware that initializes passport. 
app.use(passport.initialize());
// passport.session() is another middleware that alters the request object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object
// passport.session() middleware  that used for application uses persistent login sessions,
app.use(passport.session());

// Requiring our routes
// This is requiring these routes and express at the same time. 
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
// sequelize.sync automatically synchronizes all models (in this case and index.js and user.js)
// app.listen kicks everything off and starts the server. The console log is just a response that tells the user where they're listening aka what port.
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
