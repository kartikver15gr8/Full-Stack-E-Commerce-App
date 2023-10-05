"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.User = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
});
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    cart: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
});
const productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: String,
    imgLink: String,
});
// Defining Mongoose Models
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
exports.User = mongoose_1.default.model("User", userSchema);
exports.Product = mongoose_1.default.model("Product", productSchema);
// export { Admin, User, Product };
