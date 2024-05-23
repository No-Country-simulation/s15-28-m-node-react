import { hash } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/users.model";

const validateFields = (body: any) => {
  const userKeys = Object.keys(User.getAttributes());
  const bodyKey = Object.keys(body);
  const requiredFields = userKeys.filter(
    (key) => User.getAttributes()[key].allowNull === false
  );
  console.log("r ->", requiredFields);
  for (const key of bodyKey) {
    if (!userKeys.includes(key)) {
      return {
        message: `El campo ${key} no está definido en el modelo usuario.`,
      };
    }
  }
  for (const field of requiredFields) {
    if (!body[field]) {
      return { message: `El campo ${field} es obligatorio.` };
    }
  }
  return true;
};

const validaEmail = async (body: any) => {
  const { email } = body;
  if (!email) {
    return { message: "El correo electrónico es requerido." };
  }
  const hasEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
  if (!hasEmail) {
    return { message: "El correo electrónico no es valido." };
  }
  // Verificar si el email ya está asignado a un usuario.
  const validateEmail = await User.findOne({ where: { email } });
  if (validateEmail != null) {
    return { message: "El correo electrónico ya se encuentra registrado." };
  }
  return email;
};

const validateRole = async (body: any) => {
  // si no hay rol.
  const { role_id } = body;
  if (!role_id) {
    return { message: "El rol es requerido." };
  }
  // Verificar si el rol existe
  const validateRole = await User.findOne({ where: { role_id } });
  if (validateRole == null) {
    return { message: "El rol no se encuentra registrado." };
  }
  return role_id;
};

const validatePassword = async (body: any) => {
  // si no hay password
  const { password } = body;
  if (!password) {
    return { message: "La contraseña es requerida." };
  }
  // Al menos una letra mayúscula
  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) {
    return { message: "La contraseña debe contener al menos una letra mayúscula."};
  }
  // Al menos una letra minúscula
  const hasLowercase = /[a-z]/.test(password);
  if (!hasLowercase) {
    return { message: "La contraseña debe contener al menos una letra minúscula" };
  }
  // Al menos un número
  const hasNumber = /\d/.test(password);
  if (!hasNumber) {
    return { message: "La contraseña debe contener al menos un número" };
  }
  // Al menos un carácter especial
  const hasSpecialChar = /[^a-zA-Z\d]/.test(password);
  if (!hasSpecialChar) {
    return { message: "La contraseña debe contener al menos un carácter especial." };
  }
  // Al menos 8 caracteres
  const hasLength = password.length;
  const numMaxLength = 8;
  if (hasLength < numMaxLength) {
    return { message: "La contraseña debe contener al menos 8 caracteres" };
  }
  // Sin espacios
  const hasSpace = /\s/.test(password);
  if (hasSpace) {
    return { message: "La contraseña no debe contener espacios" };
  }
  // Encriptar la contraseña
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const validateFirstName = (body: any) => {
  const { name } = body;
  if (!name) {
    return { message: "El nombre es requerido." };
  }
  // Eliminar espacios al principio y al final
  const first_name = name.trim();
  // validar que el nombre solo contenga letras
  const onlyLetters = /^[a-zA-Z\s]+$/.test(first_name);
  if (!onlyLetters) {
    return { message: "El nombre solo puede contener letras." };
  }
  // Validar que el nombre no este vacío
  if (first_name === "") {
    return { message: "El nombre no puede estar vacío." };
  }
  // Validar que el nombre no contenga solo espacios
  if (first_name.trim() === "") {
    return { message: "El nombre no puede contener solo espacios." };
  }

  return first_name;
};

export async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;
    // Validar columnas.
    const first_name = body.first_name;
    const last_name = body.last_name;
    const birthdate = body.birthdate;
    const phone = body.phone;

    //validaciones de campos
    const validate = validateFields(body);
    if (validate !== true) {
      return res.status(404).json(validate);
    }
    const email = await validaEmail(body);
    if (!email) {
      return res.status(404).json(email);
    }
    const role_id = await validateRole(body);
    if (!role_id) {
      return res.status(404).json(role_id);
    }
    const password = await validatePassword(body);
    if (!password) {
      return res.status(404).json(password);
    }


    // Crear el usuario.
    const newUser = await User.create({
      first_name,
      last_name,
      password,
      email,
      birthdate,
      phone,
      role_id,
    });
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
    const body = req.body;
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
