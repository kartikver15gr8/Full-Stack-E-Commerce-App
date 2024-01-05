import mongoose from "mongoose";
import express from "express";
import { User, Admin, Product } from "../db";
import jwt from "jsonwebtoken";
import { SECRET_KEY, authenticate } from "../middleware/auth";
import { z } from "zod";

const router = express.Router();

const adminSignupBody = z.object({
  name: z.string().min(1).max(100),
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

router.get("/me", authenticate, async (req, res) => {
  const admin = await Admin.findOne({ email: req.headers["user"] });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    email: admin.email,
  });
});

router.post("/signup", async (req, res) => {
  const userCreds = adminSignupBody.safeParse(req.body);

  if (!userCreds.success) {
    return res.status(411).json({ msg: "Invalid Inputs" });
  }

  const email: string = userCreds.data.email;
  const name: string = userCreds.data.name;
  const password: string = userCreds.data.password;

  const admin = await Admin.findOne({ email });

  if (admin) {
    res.status(403).json({ message: `Admin Already Exists: ${email}` });
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
router.post("/login", async (req, res) => {
  const userCreds = adminSignupBody.safeParse(req.body);

  if (!userCreds.success) {
    return res.status(411).json({ msg: "Invalid Inputs" });
  }

  const email = userCreds.data.email;
  const password = userCreds.data.password;

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
router.post("/createProduct", authenticate, async (req, res) => {
  const email = req.headers["user"];
  const admin = await Admin.findOne({ email });

  if (admin) {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json({ message: "Product Created Successfully!" });
  } else {
    res.status(403).send("Can't Create Product");
  }
});

router.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(411);
  }
});

export default router;
