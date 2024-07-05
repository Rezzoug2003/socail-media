import express from 'express';
import { userRoute } from './routes/users.js';
import { authRoute } from './routes/auth.js';
import cookieParser from 'cookie-parser';
import  cors from 'cors';
import { postsRoute } from './routes/posts.js';
import multer from 'multer';
import { commentRoute } from './routes/comment.js';
import { likesRoute } from './routes/likes.js';
import { relationshipsRoute } from './routes/relationships.js';
import { storyRoute } from './routes/stories.js';
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postsRoute)
app.use("/api/comments",commentRoute)
app.use("/api/likes", likesRoute);
app.use("/api/relationships", relationshipsRoute);
app.use("/api/stories", storyRoute);
app.listen(8800, () => {
    console.log("server listening on 8800")
})