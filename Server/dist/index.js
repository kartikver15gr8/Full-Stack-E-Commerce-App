"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const PORT = 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
// Connecting to our database cloud instance
mongoose_1.default.connect(
  "mongodb+srv://builderschaincommunity:TujhaAichaGawat@cluster1.zw1vlfc.mongodb.net/Ama",
  { dbName: "Ama" }
);
// Listening App at PORT!
app.listen(PORT, () => {
  console.log(`App successfully hosted at port ${PORT}`);
});
