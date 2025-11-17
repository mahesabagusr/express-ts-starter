"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("@/modules/Users/controllers/users");
const jwt_1 = require("@/middlewares/jwt");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const tes = req.body;
    console.log(tes);
    res.status(200).json({ message: "Hello, world!" });
});
router.post("/register", users_1.userRegister);
router.post("/login", users_1.userLogin);
router.post("/edit", jwt_1.verifyToken, users_1.userEdit);
exports.default = router;
