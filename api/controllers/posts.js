import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt  from 'jsonwebtoken';
export const getPosts = (req, res) => {
  const userId = req.query.userId;
  console.log(userId);
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q =
      userId !== "undefined"
        ? `
      SELECT p.*, u.id AS userId, u.name, u.profilePic 
      FROM posts AS p 
      JOIN users AS u ON p.userId = u.id
      WHERE p.userId = ?
      ORDER BY p.createdAt DESC
      `
        : `
      SELECT p.*, u.id AS userId, u.name, u.profilePic 
      FROM posts AS p 
      JOIN users AS u ON p.userId = u.id
      LEFT JOIN relationship AS r ON p.userId = r.followedUserId
      WHERE r.followersUserId = ? OR p.userId = ?
      ORDER BY p.createdAt DESC
      `;
    
    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(data);
    });
  });
};
export const addPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json("Post has been created");
    });
  });
};
export const deletePosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";;
   

    db.query(q, [req.params.id,userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
       if (data.affectedRows > 0) {
         return res.json("post has been deleted!");
       }
      return res.status(200).json("you can delete only your posts");
    });
  });
};

