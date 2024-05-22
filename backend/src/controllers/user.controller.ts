import { hash } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/users.model";


export async function createUser(req: Request, res: Response) {
  try {
    const {
        first_name,
        last_name,
        email,
        password,
        birthdate,
        role_id,
        phone,
    } = req.body;
    const validateEmail = await User.findOne({ where: { email } });
    if (validateEmail != null) {
      return res
        .status(404)
        .json({ message: "El email ya se encuentra registrado" });
    }
    const hashedPassword = await hash(password, 10);
    // Crear el usuario.
    const newUser = await User.create({
      first_name,
      last_name,
      password: hashedPassword,
      email,
      birthdate,
      phone,
      role_id
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Crear Usuario tiene un error interno del Servidor" });
  }
}

export async function getUsers(_req: Request, res: Response) {
  try {
    const findUsers = await User.findAll();
    return res.status(200).json(findUsers);
  } catch (error) {
    return res.status(500).json({ message: "Listado de los usuarios tiene un error interno del Servidor" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const findUserById = await User.findByPk(id);
    if (findUserById == null) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return res.status(200).json(findUserById);
  } catch (error) {
    return res.status(500).json({ message: "La búsqueda de usuario por id tiene un error interno del Servidor." });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const body = req.body;
    const [updated] = await User.update(body, {
      where: { uuid: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      if (updatedUser == null) {
        return res.status(404).json({ message: "Usuario no se pudo actualizar." });
      }
      return res.status(200).json(updatedUser);
    }
    return res.status(404).json({ message: "Usuario no encontrado." });
  } catch (error) {
    return res.status(500).json({ message: "La actualización del usuario tiene un error interno del Servidor." });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const deletedUser = await User.destroy({ where: { uuid: id } });
    console.log("deletedUser->", deletedUser);
    if (deletedUser === 1) {
      return res.status(200).json({ message: "El usuario ha sido eliminado." });
    }
    return res.status(404).json({ message: "El usuario no se pudo eliminar." });
  } catch (error) {
    return res.status(500).json({ message: "La eliminación del usuario tiene un error interno del Servidor." });
  }
}
