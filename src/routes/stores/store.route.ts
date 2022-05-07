import { Router } from "express";

import StoreCtrl from '../../controllers/stores/store.ctrl'
import AuthUserMiddleware from "../../middleware/auth/auth_user";
import CreateValidation from '../../middleware/validation/store/create.validation'
const _storeCtrl = StoreCtrl.getInstance()

const _createValidation = new CreateValidation;

const router = Router()
const _authMiddleware = new AuthUserMiddleware();


router.get('/',_authMiddleware.verifyAuth, _storeCtrl.index)
router.get('/:id',_authMiddleware.verifyAuth, _storeCtrl.show)
router.post('/', _createValidation.validData(), _createValidation.validate,_authMiddleware.verifyAuth,_storeCtrl.stores)
router.put('/:id', _createValidation.validData(), _createValidation.validate,_authMiddleware.verifyAuth,_storeCtrl.update)
router.delete('/:id', _authMiddleware.verifyAuth,_storeCtrl.inactive)

export default router