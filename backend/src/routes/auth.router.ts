import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { isApiKey } from '../middlewares/apiKey.middleware';
import { validateJWT } from '../middlewares/validateJWT.middleware';

const router = Router();

router.get("/logout",isApiKey, validateJWT, logout);
router.post("/login", isApiKey, login);
router.post("/register", isApiKey, register);


export { router };
