import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";
import initializePrisma from "./helpers/db/prisma/initialize";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.EXPRESS_PORT || 3000;

app.use("/api/users", userRouter);

initializePrisma(); // or IntializeSquelize() if you are using Sequelize;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
