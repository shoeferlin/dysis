import * as express from 'express';
import AuthenticationController from '../authentication/AuthenticationController.js';
import ParticipantController from './ParticipantController.js';

const participantRouter: express.Router = express.Router();

participantRouter.post('/create', ParticipantController.create);
participantRouter.post('/update/dysis', ParticipantController.updateDysis);

/** Authentication required below */
participantRouter.use(AuthenticationController.validateAuthentication);

participantRouter.get('/all', ParticipantController.all);

export default participantRouter;
