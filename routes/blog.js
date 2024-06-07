const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const path = require("path");


//create new blog
router.post("/", async (req, res) => {
  const { title, content, author } = req.body; 

  try {
    if (!title || !content || !author) {
      return res.status(400).send("all fields are required");
    }
    const blog = await Blog.create(req.body);
    return res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


//get all blogs
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//get blog by id
router.get('/:id',async(req,res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if(!blog){
          return  res.status(404).json({msg:"Blog not found"})
        }
        else{
          return  res.status(201).json({blog})
        }
        
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

// update a blog
router.put('/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const updateData = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      const blog = await Blog.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      } else {
        res.status(201).json({ msg: "Blog Updated", blog });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  


  // delete a blog
  router.delete('/:id',async(req,res) => {
    try {
        const blog = await Blog.findByIdAndDelete({_id:req.params.id})
        if(!blog){
            res.status(404).json({ msg: "Blog Not Found" });
        }
        res.status(204)
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
  })


  module.exports = router