import { Router } from 'express'

import EventCtrl from '../../controllers/events/event.ctrl'
import StoreValidateRequest from '../../middleware/validation/events/store.validation'
import AuthUserMiddleware from "../../middleware/auth/auth_user";

const _eventCtrl = EventCtrl.getinstance()
const _storeValidation = new StoreValidateRequest;
const _authMiddleware = new AuthUserMiddleware();
const router = Router()

router.get('/',_authMiddleware.verifyAuth,_eventCtrl.index)
router.get('/:id',_authMiddleware.verifyAuth,_eventCtrl.show)
router.post('/',_storeValidation.validData(), _storeValidation.validate,_authMiddleware.verifyAuth,_eventCtrl.store)
router.put('/:id',_storeValidation.validData(), _storeValidation.validate,_authMiddleware.verifyAuth,_eventCtrl.update)
router.delete('/:id',_authMiddleware.verifyAuth,_eventCtrl.inactive)

export default router;