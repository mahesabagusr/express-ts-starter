import { Router } from "express";
import { getUsers, postUsers } from "../handlers/users";

const router = Router();

router.get("/", getUsers);

router.post("/", postUsers);
export default router;
