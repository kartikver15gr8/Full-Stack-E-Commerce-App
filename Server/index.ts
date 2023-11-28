import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";

import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connecting to our database cloud instance
// Its just a personal project, DON'T MISUSE THIS THANKYOU!!
mongoose.connect(
  "mongodb+srv://builderschaincommunity:TujhaAichaGawat@cluster1.zw1vlfc.mongodb.net/Ama",
  { dbName: "Ama" }
);

// Listening App at PORT!
app.listen(PORT, () => {
  console.log(`App successfully hosted at port ${PORT}`);
});
