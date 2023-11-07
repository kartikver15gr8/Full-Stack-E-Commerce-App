"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const db_1 = require("../db");
const router = express_1.default.Router();
router.get("/me", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ email: req.headers["user"] });
    if (!user) {
        res.status(403).json({ msg: "User doesnt exist" });
        return;
    }
    res.json({
        email: user.email,
    });
}));
// User Signup Route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreds = req.body;
    const email = userCreds.email;
    const user = yield db_1.User.findOne({ email });
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
        const newUser = new db_1.User(obj);
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ email, role: "user" }, auth_1.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "User Created Successfully", token });
    }
}));
// User Login Route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreds = req.body;
    const email = userCreds.email;
    const password = userCreds.password;
    const user = yield db_1.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ email, role: "user" }, auth_1.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "User Logged in Successfully", token });
    }
    else {
        res.status(401).send("Invalid Creds!");
    }
}));
router.post("/add-to-cart", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.body.productId;
        const product = yield db_1.Product.findOne({ _id: productId });
        const userEmail = req.headers["user"];
        if (product) {
            const user = yield db_1.User.findOne({ email: userEmail });
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
router.get("/cart", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.headers["user"];
        const user = yield db_1.User.findOne({ email });
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
// router.get("/products", authenticate, async (req, res) => {
//   const products = await Product.find();
//   if (products) {
//     res.status(200).json(products);
//   } else {
//     res.status(411).send("Kuch gadbad");
//   }
// });
exports.default = router;
