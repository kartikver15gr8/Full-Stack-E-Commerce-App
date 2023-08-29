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

// Admins Secret Key
const adminSecret = "ILOVECODING";

// JWT Verification for Admins
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, adminSecret, (err, user) => {
      if (err) {
        return res.status(403).send("Invalid Token");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(411);
  }
};

// Users Secret Key
const userSecret = "HastaLaVistaBaby!";
// JWT Verification for Users
const userAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[0];
    jwt.verify(token, userSecret, (err, user) => {
      if (err) {
        return res.status(411).send("Invalid Token!");
      } else {
        req.user = user;
        next();
      }
    });
  }
  res.status(411).send("Forbidden!");
};

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

// Route for Creating Product
app.post("/admin/createProduct", authenticateAdmin, async (req, res) => {
  const email = req.user.email;
  const admin = await Admin.findOne({ email });

  if (admin) {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json({ message: "Product Created Successfully!" });
  } else {
    res.status(403).send("Can't Create Product");
  }
});

app.get("/admin/products", async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(411);
  }
});

// User Signup Route
app.post("/user/signup", async (req, res) => {
  const userCreds = req.body;
  const email = userCreds.email;

  const user = await User.findOne({ email });

  if (user) {
    res.status(403).send("User already exists!");
  } else {
    const obj = {
      name: userCreds.name,
      email: userCreds.email,
      password: userCreds.password,
      address: userCreds.address,
      cart: [],
      orders: [],
    };
    const newUser = new User(obj);
    newUser.save();

    const token = jwt.sign({ email, role: "user" }, userSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User Created Successfully", token });
  }
});

// User Login Route
app.post("/user/login", async (req, res) => {
  const userCreds = req.body;
  const email = userCreds.email;
  const password = userCreds.password;

  const user = await User.findOne({ email, password });
  if (user) {
    const token = jwt.sign({ email, role: "user" }, userSecret, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User Logged in Successfully", token });
  } else {
    res.status(401).send("Invalid Creds!");
  }
});

// Listening App at PORT!
app.listen(PORT, () => {
  console.log(`App successfully hosted at port ${PORT}`);
});
