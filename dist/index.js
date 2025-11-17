"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("@/routes/users"));
const initialize_1 = __importDefault(require("@/helpers/db/prisma/initialize"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.EXPRESS_PORT || 3000;
app.use("/api/users", users_1.default);
(0, initialize_1.default)(); // or IntializeSquelize() if you are using Sequelize;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
