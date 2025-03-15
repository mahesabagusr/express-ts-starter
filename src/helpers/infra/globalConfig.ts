import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config({ path: ".env" });

interface ExpressConfig {
  port: string | undefined;
  host: string | undefined;
}

interface DbConfig {
  database: string | undefined;
  user: string | undefined;
  password: string | undefined;
  host: string | undefined;
  port: number | undefined; // Port is a number
  dialect: Dialect;
}

interface Config {
  express: ExpressConfig;
  db: DbConfig;
}

export const config: Config = {
  express: {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST,
  },
  db: {
    database: process.env.MYSQL_DEV,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
      ? parseInt(process.env.MYSQL_PORT, 10)
      : undefined,
    dialect: process.env.MYSQL_DIALECT as Dialect,
  },
};
