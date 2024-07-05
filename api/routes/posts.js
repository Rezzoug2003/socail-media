import express from "express";
import { addPosts, getPosts, deletePosts } from "../controllers/posts.js";
export const postsRoute = express.Router();
postsRoute.get("/",getPosts)
postsRoute.post("/",addPosts)
postsRoute.delete("/:id",deletePosts)