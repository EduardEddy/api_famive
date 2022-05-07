import { Router } from 'express'
import RecoveryPassword from '../../controllers/auth/recovery_password'
import ResetPasswordValidationRequest from '../../middleware/validation/reset_password/reset_password.validation';
import ChangePasswordValidateRequest from '../../middleware/validation/reset_password/change_password_validate';

const _recoveryPassword = new RecoveryPassword
const _resetPasswordValidate = new ResetPasswordValidationRequest
const _changePasswordValidate = new ChangePasswordValidateRequest

const router = Router();
router.post('/recovery-password',_resetPasswordValidate.validData(), _resetPasswordValidate.validate, _recoveryPassword.createCode)
router.post('/change-password', _changePasswordValidate.validData(), _changePasswordValidate.validate ,_recoveryPassword.changePassword)

export default router;