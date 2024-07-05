import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";
export const getUser = (req, res) => {
  const userId = req.params.id;
  const q = `SELECT * FROM users WHERE id=(?)`;
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...other } = data[0];
    return res.status(200).json(other);
  });
};
export const updateUserInfo = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in yet" });
  }

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    let hashedPassword;
    if (req.body.password) {
      try {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
      } catch (hashError) {
        return res.status(500).json({ error: "Error hashing password" });
      }
    }

    const q =
          "UPDATE users SET `email`=?, `name`=?, `password`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=?";
      console.log(userInfo.id+"apdate")

    db.query(
      q,
      [
        req.body.email,
        req.body.name,
        hashedPassword || req.body.password,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        if (data.affectedRows > 0) {
          return res.json("Updated!");
        }
        return res.status(403).json("You can update only your account!");
      }
    );
  });
};
