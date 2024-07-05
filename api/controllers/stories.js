import jwt from "jsonwebtoken";
import { db } from "../connect.js";
export const getStories = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q = `
      SELECT s.*, u.id AS userId, u.name 
      FROM storyies AS s 
      JOIN users AS u ON s.userId = u.id
      LEFT JOIN relationship AS r ON s.userId = r.followedUserId
      WHERE r.followersUserId = ? OR s.userId = ?
      
      `;

    const values = [userInfo.id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(data);
    });
  });
};
export const addStory = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q = "INSERT INTO storyies ( `img`,  `userId`) VALUES (?, ?)";
    const values = [req.body.img, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json("story has been created");
    });
  });
};
