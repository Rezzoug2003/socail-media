import express from "express";
import { addStory, getStories } from "../controllers/stories.js";
export const storyRoute = express.Router();
storyRoute.post("/", addStory);
storyRoute.get("/", getStories);

