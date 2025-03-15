import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";
import initializeDatabase from "./helpers/db/mysql/initialize";

dotenv.config();

const app: Express = express();

const port = process.env.EXPRESS_PORT || 3000;

app.use("/api/users", userRouter);

initializeDatabase();

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
