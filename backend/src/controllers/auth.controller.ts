import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { createUser } from "./user.controller";
import { User } from "../models/users.model";
import { Expire, Secret } from "../utils/config";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    // valida credenciales
    const userLog: any = await User.findOne({ where: { email } });
    if (!userLog) {
      return res.status(401).json({ message: "El email no esta asociado a ningún usuario." });
    }
    const passwordEncrypt = userLog.password;
    const passwordMatch = await compare(password, passwordEncrypt);
    if (!passwordMatch) {
      return res.status(401).json({ message: "La contraseña es incorrecta." });
    }
    // Generando token.
    const token = sign({ id: userLog.id }, `${Secret}`, { expiresIn: Expire });
    // responde
    return res.status(200).json({ message: "Inicio de sesión correcto.", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "El inicio de sesión tiene un error interno del Servidor," });
  }
}

export async function register(req: Request, res: Response) {
  try {
    await createUser(req, res);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "El registro de usuario tiene un error interno del Servidor.",
      });
  }
}
