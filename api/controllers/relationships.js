import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => { 
    const q = `SELECT followersUserId FROM relationship WHERE followedUserId=(?)`;
    db.query(q, [req.query.followedUserId], (err, data) => { 
        if (err) return res.status(500).json(err);
        return res
          .status(200)
          .json(data.map((relationship) => relationship.followersUserId));
    })
}
export const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q =
      "INSERT INTO relationship ( `followersUserId`, `followedUserId`) VALUES (?, ?)";
    const values = [userInfo.id, req.body.followedUserId];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json("you are following this user");
    });
  });
};
export const deleteRelationships = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const q =
      "DELETE FROM relationship WHERE followersUserId=? AND followedUserId=? ";
    const values = [userInfo.id, req.query.followedUserId];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json("you are unfollowed this user");
    });
  });
};