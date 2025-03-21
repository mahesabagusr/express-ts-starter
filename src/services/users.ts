import * as wrapper from "../helpers/utils/wrapper";
import User from "../models/users";
import { NotFoundError, UnauthorizedError } from "../helpers/error";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { BadRequestError } from "../helpers/error";
import logger from "../helpers/utils/winston";
import { EditUserDto, LoginUserDto, RegisterUserDto } from "../dtos/user-dto";
import { ResponseResult } from "../interfaces/wrapper-interface";
import { JwtToken } from "../interfaces/users-interface";
import { Op } from "sequelize";
import { createToken } from "../middlewares/jwt";

export default class UserService {
  static async register(
    payload: RegisterUserDto
  ): Promise<ResponseResult<string>> {
    try {
      const { username, email, password } = payload;

      logger.info(`Creating Account: ${username}`);
      const existingEmail: User | null = await User.findOne({
        where: { email },
      });

      if (existingEmail) {
        return wrapper.error(new UnauthorizedError(`Email Already Exist`));
      }

      const existingUser: User | null = await User.findOne({
        where: { username },
      });

      if (existingUser) {
        return wrapper.error(new UnauthorizedError(`Username Already Exist`));
      }

      const signature: string = nanoid(4);

      const hashPassword: string = await bcrypt.hash(password, 10);

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

  static async login(payload: LoginUserDto): Promise<ResponseResult<JwtToken>> {
    try {
      const { password, identifier } = payload;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: identifier }, { email: identifier }],
        },
      });

      if (!user) {
        return wrapper.error(new NotFoundError("User not found"));
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return wrapper.error(new UnauthorizedError("Incorrect password"));
      }

      const { accessToken } = await createToken(user);
      return wrapper.data({ token: accessToken });
    } catch (err: any) {
      return wrapper.error(new BadRequestError(`${err.message}`));
    }
  }

  static async edit(payload: EditUserDto): Promise<ResponseResult<string>> {
    try {
      const { username, fullname, accessToken } = payload;
    } catch (err: any) {}
  }
}
