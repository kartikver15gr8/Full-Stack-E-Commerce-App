import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";

import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connecting to our database cloud instance
mongoose.connect(
  "mongodb+srv://builderschaincommunity:TujhaAichaGawat@cluster1.zw1vlfc.mongodb.net/Ama",
  { dbName: "Ama" }
);

// Listening App at PORT!
app.listen(PORT, () => {
  console.log(`App successfully hosted at port ${PORT}`);
});
