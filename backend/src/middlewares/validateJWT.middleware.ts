import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Secret } from "../utils/config";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Check authorization");
    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Unauthorized access" });
    const userInfo = verify(token, Secret);
    console.log("jwt ->", userInfo);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Validate JWT Internal server error." });
  }
};
