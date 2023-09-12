const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;

const app = express();
app.use(cors());
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
const SECRET_KEY = "ILOVECODING";

// JWT Verification for Admins
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
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

// // Users Secret Key
// const SECRET_KEY = "HastaLaVistaBaby!";
// // JWT Verification for Users
// const userAuthentication = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, SECRET_KEY, (err, user) => {
//       if (err) {
//         return res.status(411).send("Invalid Token!");
//       }
//       req.user = user;
//       next();
//     });
//   }
//   res.status(411).send("Forbidden!");
// };

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
    const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, {
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
    const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Admin logged in successfully!", token });
  } else {
    res.status(403).send("Invalid Credentials!");
  }
});

// Route for Creating Product
app.post("/admin/createProduct", authenticate, async (req, res) => {
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
    await newUser.save();

    const token = jwt.sign({ email, role: "user" }, SECRET_KEY, {
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
    const token = jwt.sign({ email, role: "user" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User Logged in Successfully", token });
  } else {
    res.status(401).send("Invalid Creds!");
  }
});

app.post("/user/add-to-cart", authenticate, async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findOne({ _id: productId });
    const userEmail = req.user.email;

    if (product) {
      const user = await User.findOne({ email: userEmail });

      if (user) {
        if (user.cart.includes(productId)) {
          res
            .status(200)
            .json({ message: "Item already in the cart", productId });
        } else {
          user.cart.push(productId);
          await user.save();
          res
            .status(200)
            .json({ message: "Item added to the cart", productId });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/user/cart", authenticate, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .send("Thodi Aur Mehnat karo, you're not getting the cart!");
    }
    const cart = user.cart;
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Listening App at PORT!
app.listen(PORT, () => {
  console.log(`App successfully hosted at port ${PORT}`);
});
