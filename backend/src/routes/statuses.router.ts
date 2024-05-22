import { Router } from "express";
import { StatusesController } from "../controllers/statuses.controller";

const router = Router();

router.post("/", StatusesController.createStatus);
router.get("/", StatusesController.getStatuses);
router.get("/:id", StatusesController.getStatusById);
router.patch("/:id", StatusesController.updateStatus);
router.delete("/:id", StatusesController.deleteStatus);

export { router };
