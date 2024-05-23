import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { createUser } from "./user.controller";
import { User } from "../models/users.model";
import { Expire, Secret } from "../utils/config";

const userKeys = Object.keys(User.getAttributes());

const validateFields = (body: any) => {
  // No este vació el Cuerpo de la petición
  const bodyKey = Object.keys(body);
  if (bodyKey.length === 0) {
    return { message: "No hay campos en el cuerpo de la petición." };
  }
  // Validar campos contra modelos
  for (const key of bodyKey) {
    if (!userKeys.includes(key)) {
      return {
        message: `El campo ${key} no está definido en el modelo usuario.`,
      };
    }
  }
  return true;
};

const validateRequeridFields = (body: any) => {
  const requiredFields = ["email", "password"];
  const extraFields = Object.keys(body).filter(
    (key) => !requiredFields.includes(key)
  );
  if (extraFields.length > 0) {
    if (extraFields.length === 1) {
      return {
        message: `El campo ${extraFields[0]} no es admitido en el inicio de sesión.`,
      };
    } else {
      return {
        message: `Los campos ${extraFields.join(
          ", "
        )} no son admitidos en el inicio de sesión.`,
      };
    }
  }
  const invalidFields: string[] = [];
  for (const field of requiredFields) {
    if (!body[field]) {
      invalidFields.push(field);
    }
  }
  if (invalidFields.length > 0) {
    if (invalidFields.length === 1) {
      return { message: `El campo ${invalidFields[0]} es requerido.` };
    } else {
      return {
        message: `Los campos ${invalidFields.join(", ")} son inválidos.`,
      };
    }
  }
  return true;
};

export async function login(req: Request, res: Response) {
  try {
    const body = req.body;
    const validateBodyInModel = validateFields(body);
    console.log("validate ->", validateBodyInModel);
    if (validateBodyInModel !== true)
      return res.status(400).json(validateBodyInModel);
    const validateRequeridBody = validateRequeridFields(body);
    if (validateRequeridBody !== true)
      return res.status(400).json(validateRequeridBody);
    // valida credenciales
    const userLog: any = await User.findOne({ where: { email: body.email } });
    if (!userLog) {
      return res
        .status(401)
        .json({ message: "El email no esta asociado a ningún usuario." });
    }
    const passwordEncrypt = userLog.password;
    const passwordMatch = await compare(body.password, passwordEncrypt);
    if (!passwordMatch) {
      return res.status(401).json({ message: "La contraseña es incorrecta." });
    }
    // Generando token.
    const token = sign({ id: userLog.id }, `${Secret}`, { expiresIn: Expire });
    // responde
    return res
      .status(200)
      .json({ message: "El inicio de sesión ha sido exitoso.", token });
  } catch (error) {
    return res.status(500).json({
      message: "El inicio de sesión tiene un error interno del Servidor,",
    });
  }
}

export async function register(req: Request, res: Response) {
  try {
    await createUser(req, res);
  } catch (error) {
    return res.status(500).json({
      message: "El registro de usuario tiene un error interno del Servidor.",
    });
  }
}
