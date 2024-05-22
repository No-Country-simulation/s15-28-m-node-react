import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { createUser } from "./user.controller";
import { User } from "../models/users.model";
import { Expire, Secret } from "../utils/config";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log("email->", email);
    console.log("password->", password);
    if (!email || !password)
      return res.status(400).json({ message: "Credentials not found." });
    // valida credenciales
    const userLog: any = await User.findOne({ where: { email } });
    console.log("userLog->", userLog);
    if (!userLog) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const passwordEncrypt = userLog.password;
    console.log("passwordEncrypt->", passwordEncrypt);
    const passwordMatch = await compare(password, passwordEncrypt);
    console.log("passwordMatch->", passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // Generando token.
    const token = sign({ id: userLog.id }, `${Secret}`, { expiresIn: Expire });
    console.log("token->", token);
    // responde
    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function register(req: Request, res: Response) {
  try {
    await createUser(req, res);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function logout(_req: Request, res: Response) {
  try {
    const token = _req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization required" });
    }
    /*const userLogout = await User.findOne({ where: { token } });
    if (!userLogout) {
      return res.status(404).json({ message: "User not found." });
    }
    /*userLogout.token = null;
    const [updated] = await User.update(
      { token: null },
      {
        where: { uuid: userLogout.id },
      }
    );*/
    return res.status(200).json({ message: "User logout" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
