const mongoose = require("mongoose");


//connect to the mongodb database
const connectDB = (url) => {
  mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err));
};

module.exports = connectDB