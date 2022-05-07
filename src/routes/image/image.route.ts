import { Router } from 'express'
import AuthUserMiddleware from '../../middleware/auth/auth_user'

import ImageCtrl from '../../controllers/image/image.ctrl'
import ImageValidationRequest from '../../middleware/validation/image/store.validation'

const route = Router()
const _imageCtrl = new ImageCtrl();
const _auth = new AuthUserMiddleware();
const _storeValidation = new ImageValidationRequest()

route.post('/image-create', _storeValidation.validData(), _storeValidation.validate, _auth.verifyAuth, _imageCtrl.receiveImage)

export default route