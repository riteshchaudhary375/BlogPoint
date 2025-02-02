import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectCloudinary from "./utils/cloudinary.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import messageRoutes from "./routes/message.route.js";
import subscriberRoutes from "./routes/subscriber.route.js";
import subscriptionPackageRoutes from "./routes/subscription.package.route.js";

// 1. 'build' script in root package.json
// 2. importing path package
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// 2. Initializing & creating directory name for getting specific file/folder/project available in any path
const __dirname = path.resolve();

// Connect to cloudinary
connectCloudinary();

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// API endpoint
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/subscriptionPackage", subscriptionPackageRoutes);

// 3. specify the folder & file to get particular file start build and run project
// specifying 'static' because our project is dynamic in nature which is changing pages/files randamly
// so we have to specify statically so that our project will get start from particular file.
app.use(express.static(path.join(__dirname, "/client/dist"))); // it will find the folder and run the 'index.html' file from client folder
// whatever folder/file we get, just go to 'index.html' file following below directions and join that file to the path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// 4. commit to github
// 5. deploy (e.g.: render.com)
/* 
  ------------------------
  Deployment on RENDER.COM
  ------------------------
  i. sign-in
  ii. New
  iii. Web Service
  iv. Build and deploy from a git repository -> Next
  v. Search repo and click connect
  vi. Name: blogpoint
  vii. Language: Node
  viii. Branch: Main
  ix. Region: Oregon(US West)
  x. Root Directory:
  xi. Build Command: npm run build
  xii. Start Command: npm start

  xiii. Instance Type: Free
  xiv. Environment Variable: -----key-value-----from both api and client(no inverted comma-only key-value)-----
  xv. Deploy Web Service - Submit
*/

// Middleware for error handle
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
