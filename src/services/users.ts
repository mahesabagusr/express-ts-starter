import { Request, Response } from "express";
import { RegisterPayload } from "../interfaces/users-interface";
import * as wrapper from "../helpers/utils/wrapper";
import User from "../models/users";
import { UnauthorizedError } from "../helpers/error";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { BadRequestError } from "../helpers/error";
import logger from "../helpers/utils/winston";

export default class UserService {
  static async registerUser(payload: RegisterPayload) {
    try {
      const { username, email, password } = payload;

      logger.info(`Checking if email ${email} already exists...`);
      const existingEmail: User | null = await User.findOne({
        where: { email },
      });

      if (existingEmail) {
        return wrapper.error(new UnauthorizedError(`Email Already Exist`));
      }

      logger.info(`Checking if username ${username} already exists...`);
      const existingUser: User | null = await User.findOne({
        where: { username },
      });

      if (existingUser) {
        return wrapper.error(new UnauthorizedError(`Username Already Exist`));
      }

      const signature: string = nanoid(4);
      logger.info(`Generated signature: ${signature}`);

      const hashPassword: string = await bcrypt.hash(password, 10);
      logger.info(`Hashing password...`);

      logger.info(
        `Creating new user with email ${email} and username ${username}...`
      );
      const createUser = await User.create({
        username,
        email,
        password: hashPassword,
        signature: signature,
      });

      if (!createUser) {
        logger.error(`Failed to create user with email ${email}`);
        return wrapper.error(new BadRequestError("Failed to create user"));
      }

      return wrapper.data("Register Successfully");
    } catch (err: any) {
      logger.error(`Unexpected error during registration: ${err.message}`);
      logger.error(err.stack);
      return wrapper.error(new BadRequestError(`${err.message}`));
    }
  }
}
