//import dependency
const express = require("express");
const app = express();
const connectDB = require("./connectDB/connectDb");
const blog= require('./routes/blog')
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//setting up middleware
app.set("trust proxy", 1);
require('dotenv').config()

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.send("blog api");
});





app.use(express.json());

//any route that doesn't exist

  
//defining my port
const port = process.env.PORT || 3000;

//route to access the blog
app.use('/api/posts', blog)

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Page Not Found' });
  });

//function to connect to mongodb database atlas and listen on port
const start = async () => {
  await connectDB(process.env.Mongo_Url);
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};
start();
