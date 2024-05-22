import { NextFunction, Request, Response } from "express";
import { Key } from "../utils/config";

const authorizedHosts = ["localhost:3000", "localhost"];

export const isApiKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req->", req.headers);
    const apiKey = req.headers.apikey;
    console.log("apiKey->", apiKey);
    if (!apiKey || Key !== apiKey) {
      throw new Error("Api key not provided");
    }
    const host = req.headers.host;
    console.log("host->", host);
    if (!host || !authorizedHosts.includes(host)) {
      throw new Error("Invalid host");
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Api Key internal server error." });
  }
};
