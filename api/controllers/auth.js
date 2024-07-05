import { db } from "../connect.js";
import bcrypt, { compare } from "bcrypt";
import  jwt  from 'jsonwebtoken';
export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    // Hash the password with a salt rounds of 10
    const hash = bcrypt.hashSync(req.body.password, 10);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash, req.body.name];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("user not found");
        const comparePass = bcrypt.compareSync(req.body.password, data[0].password)
        if (!comparePass) res.status(404).json("password mismatch");
        const token = jwt.sign({ id: data[0].id }, "secretkey");
        const { password, ...other } = data[0];
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).json(other);
    })
};
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
