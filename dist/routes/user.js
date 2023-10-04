var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticate, SECRET_KEY } = require("../middleware/auth");
const { User, Product, Admin } = require("../db");
const router = express.Router();
// User Signup Route
router.post("/signup", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const userCreds = req.body;
    const email = userCreds.email;
    const user = yield User.findOne({ email });
    if (user) {
        res.status(403).send("User already exists!");
    }
    else {
        const obj = {
            name: userCreds.name,
            email: userCreds.email,
            password: userCreds.password,
            address: userCreds.address,
            cart: [],
            orders: [],
        };
        const newUser = new User(obj);
        yield newUser.save();
        const token = jwt.sign({ email, role: "user" }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "User Created Successfully", token });
    }
}));
// User Login Route
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const userCreds = req.body;
    const email = userCreds.email;
    const password = userCreds.password;
    const user = yield User.findOne({ email, password });
    if (user) {
        const token = jwt.sign({ email, role: "user" }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "User Logged in Successfully", token });
    }
    else {
        res.status(401).send("Invalid Creds!");
    }
}));
router.post("/add-to-cart", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const productId = req.body.productId;
        const product = yield Product.findOne({ _id: productId });
        const userEmail = req.user.email;
        if (product) {
            const user = yield User.findOne({ email: userEmail });
            if (user) {
                if (user.cart.includes(productId)) {
                    res
                        .status(200)
                        .json({ message: "Item already in the cart", productId });
                }
                else {
                    user.cart.push(productId);
                    yield user.save();
                    res
                        .status(200)
                        .json({ message: "Item added to the cart", productId });
                }
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred" });
    }
}));
router.get("/cart", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const email = req.user.email;
        const user = yield User.findOne({ email });
        if (!user) {
            return res
                .status(403)
                .send("Thodi Aur Mehnat karo, you're not getting the cart!");
        }
        const cart = user.cart;
        res.status(200).json(cart);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred" });
    }
}));
module.exports = router;
