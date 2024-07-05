import express from "express";
import { addRelationships, deleteRelationships, getRelationships } from "../controllers/relationships.js";
export const relationshipsRoute = express.Router();
relationshipsRoute.get("/", getRelationships);
relationshipsRoute.post("/", addRelationships);
relationshipsRoute.delete("/", deleteRelationships);
