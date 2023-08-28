const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;

const app = express();
app.use(express.json());

// Defining Mongoose Schema
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  imgLink: String,
});

// Defining Mongoose Models
const Admin = new mongoose.model("Admin", adminSchema);
const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);

// Connecting to our database cloud instance
mongoose.connect(
  "mongodb+srv://builderschaincommunity:TujhaAichaGawat@cluster1.zw1vlfc.mongodb.net/Ama",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Ama" }
);

// JWT Verification for Admins
const adminSecret = "ILOVECODING";

// JWT Verification for Users

// Admin Signup Route

app.post("/admin/signup", async (req, res) => {
  const userCreds = req.body;
  const email = userCreds.email;
  const name = userCreds.name;
  const password = userCreds.password;

  const admin = await Admin.findOne({ email });

  if (admin) {
    res
      .status(403)
      .json({ message: `Admin Already Exists: ${userCreds.email}` });
  } else {
    const obj = {
      name: name,
      email: email,
      password: password,
    };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ email, role: "admin" }, adminSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Admin Created Successfully!", token });
  }
});

// Admin Login Route
app.post("/admin/login", async (req, res) => {
  const userCreds = req.body;
  const email = userCreds.email;
  const password = userCreds.password;

  const isAdmin = await Admin.findOne({ email, password });

  if (isAdmin) {
    const token = jwt.sign({ email, role: "admin" }, adminSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Admin logged in successfully!", token });
  } else {
    res.status(403).send("Invalid Credentials!");
  }
});

app.listen(PORT, () => {
  console.log(`App successfully hosted at port ${PORT}`);
});
