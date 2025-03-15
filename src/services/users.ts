import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { createUserQueryParams } from "../interfaces/query-params.inter";
import { User } from "../interfaces/response";

export const getUsers = (req: Request, res: Response) => {
  res.send([]);
};

export const postUsers = (
  req: Request<{}, {}, CreateUserDto>,
  res: Response<User>
) => {
  res.status(201).send({
    id: 1,
    email: "mahes",
    username: "mahestzy",
  });
};
