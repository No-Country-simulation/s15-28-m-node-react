import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../models/users.model";
import { Role } from "../models/roles.model";
import { Expire, Secret } from "../utils/config";

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    // valida credenciales
    const userLog: any = await User.findOne({ where: email });
    if (!userLog) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const passwordEncrypt = userLog.password;
    const passwordMatch = await compare(password, passwordEncrypt);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // Generando token.
    const token = sign({ id: userLog.id }, `${Secret}`, { expiresIn: Expire });
    // responde
    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

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

    // Verificar si el email ya está asignado a un usuario.
    const validateEmail = await User.findOne({ where: email });
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
    // Verificar si la contraseña cumple con los criterios de validación
    // - Al menos una letra mayúscula
    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
      return res.status(404).json({
        message: "La contraseña debe contener al menos una letra mayúscula",
      });
    }
    // - Al menos una letra minúscula
    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
      return res.status(404).json({
        message: "La contraseña debe contener al menos una letra minúscula",
      });
    }
    // - Al menos un número
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      return res.status(404).json({
        message: "La contraseña debe contener al menos un número",
      });
    }
    // - Al menos un carácter especial
    const hasSpecialChar = /[^a-zA-Z\d]/.test(password);
    if (!hasSpecialChar) {
      return res.status(404).json({
        message: "La contraseña debe contener al menos un carácter especial",
      });
    }
    // - Al menos 8 caracteres
    if (password.length < 8) {
      return res.status(404).json({
        message: "La contraseña debe tener al menos 8 caracteres",
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
    const findUserById = await User.findByPk(req.params.id);
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
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
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
    const deletedUser = await User.destroy({ where: { id: req.params.id } });
    if (deletedUser) {
      return res.status(204).json({ message: "User deleted successfully." });
    }
    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
