import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET /posts - get all posts (sorted newest first)
router.get("/", async (req, res) => {
  try {
    let collection = db.collection("posts");
    let results = await collection.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});

// GET /posts/:id - get a single post by id
router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid post id");
    }
    let collection = db.collection("posts");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching post");
  }
});

// POST /posts - create a new post
router.post("/", async (req, res) => {
  try {
    const { title, author, content } = req.body;

    if (!title || !content) {
      return res.status(400).send("Title and content are required");
    }

    let newPost = {
      title,
      author: author || "Anonymous",
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let collection = db.collection("posts");
    let result = await collection.insertOne(newPost);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating post");
  }
});

// PATCH /posts/:id - update an existing post
router.patch("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid post id");
    }

    const { title, author, content } = req.body;

    let query = { _id: new ObjectId(req.params.id) };
    let updates = {
      $set: {
        ...(title !== undefined && { title }),
        ...(author !== undefined && { author }),
        ...(content !== undefined && { content }),
        updatedAt: new Date(),
      },
    };

    let collection = db.collection("posts");
    let result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});

// DELETE /posts/:id - delete a post
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid post id");
    }

    let query = { _id: new ObjectId(req.params.id) };
    let collection = db.collection("posts");
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
});

export default router;
