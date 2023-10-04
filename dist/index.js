const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
// Connecting to our database cloud instance
mongoose.connect("mongodb+srv://builderschaincommunity:TujhaAichaGawat@cluster1.zw1vlfc.mongodb.net/Ama", { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Ama" });
// Listening App at PORT!
app.listen(PORT, () => {
    console.log(`App successfully hosted at port ${PORT}`);
});
