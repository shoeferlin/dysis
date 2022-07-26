import * as express from 'express';

import trackingController from './participantController.js';
import { validateAuthentication } from '../helpers/authenticate.js';

const participantRouter: express.Router = express.Router();

participantRouter.post('/create', trackingController.create);
participantRouter.post('/update/dysis', trackingController.updateDysis);

participantRouter.use(validateAuthentication);
/** Authentication required below */

participantRouter.get('/all', trackingController.all);

export default participantRouter;
