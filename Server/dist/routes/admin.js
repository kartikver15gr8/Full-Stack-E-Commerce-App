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
const { User, Admin, Product } = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = require("../middleware/auth");
const { authenticate } = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/me", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield Admin.findOne({ email: req.headers["user"] });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json({
        email: admin.email,
    });
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreds = req.body;
    const email = userCreds.email;
    const name = userCreds.name;
    const password = userCreds.password;
    const admin = yield Admin.findOne({ email });
    if (admin) {
        res
            .status(403)
            .json({ message: `Admin Already Exists: ${userCreds.email}` });
    }
    else {
        const obj = {
            name: name,
            email: email,
            password: password,
        };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ email, role: "admin" }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "Admin Created Successfully!", token });
    }
}));
// Admin Login Route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreds = req.body;
    const email = userCreds.email;
    const password = userCreds.password;
    const isAdmin = yield Admin.findOne({ email, password });
    if (isAdmin) {
        const token = jsonwebtoken_1.default.sign({ email, role: "admin" }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "Admin logged in successfully!", token });
    }
    else {
        res.status(403).send("Invalid Credentials!");
    }
}));
// Route for Creating Product
router.post("/createProduct", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.headers["user"];
    const admin = yield Admin.findOne({ email });
    if (admin) {
        const newProduct = new Product(req.body);
        yield newProduct.save();
        res.status(200).json({ message: "Product Created Successfully!" });
    }
    else {
        res.status(403).send("Can't Create Product");
    }
}));
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product.find();
    if (products) {
        res.status(200).json(products);
    }
    else {
        res.status(411);
    }
}));
exports.default = router;
