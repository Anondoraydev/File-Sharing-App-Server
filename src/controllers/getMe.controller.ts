import type { Request, Response, NextFunction } from "express";
import { getMeService } from "../services/getMe.service.ts";

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization || req.cookies.accessToken;

    const user = await getMeService.getMe(authHeader as string);
    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
