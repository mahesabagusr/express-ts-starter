import { Request, Response, Router } from "express";
import { userRegister } from "../controllers/users";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const tes = req.body;
  console.log(tes);
  res.status(200).json({ message: "Hello, world!" });
});

router.post("/", userRegister);

export default router;
