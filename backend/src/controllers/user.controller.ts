import { hash } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/users.model";

const userKeys = Object.keys(User.getAttributes());

const validateFields = (body: any) => {
  const bodyKey = Object.keys(body);
  // No este vació el Cuerpo de la petición
  if (bodyKey.length === 0) {
    return { message: "No hay campos en el body." };
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
  const requiredFields = userKeys.filter(
    (key) => User.getAttributes()[key].allowNull === false
  );
  for (const field of requiredFields) {
    if (!body[field]) {
      return { message: `El campo ${field} es obligatorio.` };
    }
  }
  return true;
};

export async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;
    const validateBodyInModel = validateFields(body);
    if (validateBodyInModel !== true) return res.status(400).json(validateBodyInModel);
    const validateRequeridBody = validateRequeridFields(body);
    if (validateRequeridBody !== true) return res.status(400).json(validateRequeridBody);
    const hashedPassword = await hash(body.password, 10);
    body.password = hashedPassword;
    console.log("body ->", body);
    // Crear el usuario.
    const newUser = await User.create(body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Crear Usuario tiene un error interno del Servidor" });
  }
}

export async function getUsers(_req: Request, res: Response) {
  try {
    const findUsers = await User.findAll();
    return res.status(200).json(findUsers);
  } catch (error) {
    return res.status(500).json({
      message: "Listado de los usuarios tiene un error interno del Servidor",
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const findUserById = await User.findByPk(id);
    if (findUserById == null) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return res.status(200).json(findUserById);
  } catch (error) {
    return res.status(500).json({
      message:
        "La búsqueda de usuario por id tiene un error interno del Servidor.",
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const body = req.body;
    const validate = validateFields(body);
    if (validate !== true) return res.status(400).json(validate);
    const [updated] = await User.update(body, {
      where: { uuid: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      if (updatedUser == null) {
        return res
          .status(404)
          .json({ message: "Usuario no se pudo actualizar." });
      }
      return res.status(200).json(updatedUser);
    }
    return res.status(404).json({ message: "Usuario no encontrado." });
  } catch (error) {
    return res.status(500).json({
      message:
        "La actualización del usuario tiene un error interno del Servidor.",
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const deletedUser = await User.destroy({ where: { uuid: id } });
    console.log("deletedUser->", deletedUser);
    if (deletedUser === 1) {
      return res.status(200).json({ message: "El usuario ha sido eliminado." });
    }
    return res.status(404).json({ message: "El usuario no se pudo eliminar." });
  } catch (error) {
    return res.status(500).json({
      message:
        "La eliminación del usuario tiene un error interno del Servidor.",
    });
  }
}
