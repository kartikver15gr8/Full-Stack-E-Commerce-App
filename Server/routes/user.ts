import express from "express";
import jwt from "jsonwebtoken";
import { authenticate, SECRET_KEY } from "../middleware/auth";
import { User, Product, Admin } from "../db";
const router = express.Router();

// User Signup Route
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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

router.post("/add-to-cart", authenticate, async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findOne({ _id: productId });
    const userEmail = req.headers["user"];

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

router.get("/cart", authenticate, async (req, res) => {
  try {
    const email = req.headers["user"];
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

export default router;
