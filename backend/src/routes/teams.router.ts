import { Router } from "express";
import { TeamController } from "../controllers/team.controller";

const router = Router();

router.get("/teams", TeamController.getAllTeams);
router.get("/teams/:uuid", TeamController.getTeamById);
router.post("/teams", TeamController.createTeam);
router.put("/teams/:uuid", TeamController.updateTeam);
router.delete("/teams/:uuid", TeamController.deleteTeam);

export { router };
