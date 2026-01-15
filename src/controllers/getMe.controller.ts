import type { Request, Response, NextFunction } from "express";
import { getMeService } from "../services/getMe.service.ts";

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getMeService.getMe(req as any);
    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
