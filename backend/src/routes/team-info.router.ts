import { Router } from 'express';
import { TeamInfoController } from '../controllers/teamInfo.controller';

const router = Router();

router.get('/', TeamInfoController.getAllTeams);
router.get('/:uuid', TeamInfoController.getTeamById);
router.post('/', TeamInfoController.createTeam);
router.put('/:uuid', TeamInfoController.updateTeam);
router.delete('/:uuid', TeamInfoController.deleteTeam);

export {router};
