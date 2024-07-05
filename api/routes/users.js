import express from "express";
import { getUser, updateUserInfo } from "../controllers/users.js";
export const userRoute = express.Router();
userRoute.get("/find/:id", getUser);
userRoute.put("/", updateUserInfo);
