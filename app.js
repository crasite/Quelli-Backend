const express = require("express");
const mongoose = require("mongoose");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

console.log("mongo_uri: " + process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://" + process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (!isProduction) {
  app.use(errorhandler());
  mongoose.set("debug", true);
  require("./models/Test");
}

require("./models/User");
app.set("storeModel", require("./models/Store"));

var isProduction = process.env.STAGE === "production";
console.log("Serving on stage: " + process.env.STAGE);

//Add routes
app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: "OOPS Internal Server Error :C my bad...",
    },
  });
});

var server = app.listen(process.env.PORT || port, function () {
  console.log("Listening on port " + server.address().port);
});
