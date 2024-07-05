import express from "express";
import { addcomment, getComments } from "../controllers/comment.js";
export const commentRoute = express.Router();
commentRoute.get("/", getComments);
commentRoute.post("/", addcomment);
