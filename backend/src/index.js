import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./router/router.user.js";
import mailRouter from "./router/router.mail.js";
import "./config/googleAuth.js";
import googleRoute from "./router/route.google.js";
import mongoose from "mongoose";
import authorized from "./router/router.authorized.js";
import scanRouter from "./router/router.scan.js";
import reportRouter from "./router/router.report.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://4lw5g375-5173.inc1.devtunnels.ms",
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).send("Something broke!");
});

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// userRouter is the route for user authentication
app.use("/user", userRouter);
// mailRouter is the route for sending emails
app.use("/mail", mailRouter);
//  googleRoute is the route for google authentication
app.use("/auth", googleRoute);
// authorized is the route for checking if the user is authorized
app.use("/user", authorized);
// scan the url
app.use('/url',scanRouter);
// report the url
app.use('/url',reportRouter );
// 404 error handling
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
