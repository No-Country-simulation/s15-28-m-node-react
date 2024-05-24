import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { isApiKey } from '../middlewares/apiKey.middleware';

const router = Router();

router.post("/login", isApiKey, login);
router.post("/register", isApiKey, register);

export { router };
