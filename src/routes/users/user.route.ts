import { Router } from "express";

import UserCtrl from "../../controllers/users/user.ctrl"
import AuthUserMiddleware from "../../middleware/auth/auth_user";
import storeValidator from "../../middleware/validation/users/store.validation";
import UpdateValidateRequest from "../../middleware/validation/users/update.validation";

const _userCtrl = UserCtrl.getInstance();
const _storeValidator = new storeValidator
const _userUpadteValidator = new UpdateValidateRequest
const router = Router();

const _authMiddleware = new AuthUserMiddleware();

router.get('/', _authMiddleware.verifyAuth,_userCtrl.index)
router.get('/:id', _authMiddleware.verifyAuth,_userCtrl.show)
router.post('/',_storeValidator.validData(), _storeValidator.validate,_userCtrl.store)
router.put('/:id', _userUpadteValidator.validData(), _userUpadteValidator.validate, _authMiddleware.verifyAuth,_userCtrl.udpate)
router.delete('/:id',_userCtrl.delete)

export default router;