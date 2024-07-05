import express from "express";
import { addLike, deleteLike, getLikes } from "../controllers/likes.js";
export const likesRoute = express.Router();
likesRoute.get("/", getLikes);
likesRoute.post("/", addLike);
likesRoute.delete("/", deleteLike);
