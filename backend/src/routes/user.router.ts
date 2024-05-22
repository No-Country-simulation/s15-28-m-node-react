import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { isApiKey } from "../middlewares/apiKey.middleware";
import { validateJWT } from "../middlewares/validateJWT.middleware";

const router = Router();

router.get("/", isApiKey, getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id",isApiKey, validateJWT, updateUser);
router.delete("/:id", deleteUser);

export { router };
