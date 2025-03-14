import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";

dotenv.config();

const app: Express = express();

const port = process.env.EXPRESS_PORT || 3000;

app.use("/api/users", userRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Halo selamat datang");
// });

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
