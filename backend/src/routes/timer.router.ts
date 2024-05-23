import { Router } from "express";
import { createTimer, deleteTimer, getTimerById, getTimers, updateTimer } from "../controllers/timer.controller";
import { isApiKey } from "../middlewares/apiKey.middleware";
import { validateJWT } from "../middlewares/validateJWT.middleware";

const router = Router();

router.get("/", isApiKey, getTimers);
router.get("/:id", isApiKey, getTimerById);
router.post("/", isApiKey, validateJWT, createTimer);
router.put("/:id", isApiKey, validateJWT, updateTimer);
router.delete("/:id", isApiKey, validateJWT, deleteTimer);

export { router };
