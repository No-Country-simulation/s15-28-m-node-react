import { hash } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/users.model";
import { Role } from "../models/roles.model";

export async function createUser(req: Request, res: Response) {
  try {
    const {
        first_name,
        last_name,
        email,
        password,
        role_id,
        birthdate,
        phone,
    } = req.body;
    if (!first_name || !last_name || !email || !password || !role_id || !birthdate || !phone) {
      return res.status(400).json({ message: "Missing parameters." });
    }
    //verificando email valido
    const hasEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
      email
    );
    if (!hasEmail) {
      return res.status(404).json({ message: "Invalid email" });
    }
    // Verificar si el email ya está asignado a un usuario.
    const validateEmail = await User.findOne({ where: { email } });
    if (validateEmail != null) {
      return res
        .status(404)
        .json({ message: "The email is already associated with a user" });
    }

    // Verificar si el rol existe
    const validateRole = await Role.findByPk(role_id);
    if (validateRole == null) {
      return res.status(404).json({ message: "El rol no existe" });
    }
    // Verificar si la contraseña cumple con los siguientes criterios:
    // Al menos una letra mayúscula
    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
      return res.status(404).json({
        message: "Password must contain at least one uppercase letter",
      });
    }
    // Al menos una letra minúscula
    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
      return res.status(404).json({
        message: "Password must contain at least one lowercase letter",
      });
    }
    // Al menos un número
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      return res.status(404).json({
        message: "Password must contain at least one number",
      });
    }
    // Al menos un carácter especial
    const hasSpecialChar = /[^a-zA-Z\d]/.test(password);
    if (!hasSpecialChar) {
      return res.status(404).json({
        message: "Password must contain at least one special character",
      });
    }
    // Al menos 8 caracteres
    const hasLength = password.length;
    const numMaxLength = 8;
    if (hasLength < numMaxLength) {
      return res.status(404).json({
        message: "Password must be at least 8 characters",
      });
    }
    // Sin espacios
    const hasSpace = /\s/.test(password);
    if (hasSpace) {
      return res.status(404).json({
        message: "Password must not have spaces",
      });
    }
    // encripta el password
    const hashedPassword = await hash(password, 10);
    // Crear el usuario.
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role_id,
      birthdate,
      phone,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUsers(_req: Request, res: Response) {
  try {
    const findUsers = await User.findAll();
    if (!findUsers) {
      return res.status(404).json({ message: "Users not found" });
    }
    return res.status(200).json(findUsers);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: "Parameter not found." });
    const findUserById = await User.findByPk(id);
    if (findUserById == null) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(findUserById);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log("id->", id);
    if (!id) return res.status(404).json({ message: "Parameter not found." });
    const body = req.body;
    console.log("body->", body);
    if (!body) return res.status(404).json({ message: "Body not found." });
    const [updated] = await User.update(body, {
      where: { uuid: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      if (updatedUser == null) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.status(200).json(updatedUser);
    }
    return res.status(404).json({ message: "Project not found." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log("id->", id);
    if (!id) return res.status(404).json({ message: "Parameter not found." });
    const deletedUser = await User.destroy({ where: { uuid: id } });
    console.log("deletedUser->", deletedUser);
    if (deletedUser === 1) {
      return res.status(200).json({ message: "User deleted successfully." });
    }
    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
