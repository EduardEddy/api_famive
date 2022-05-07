import { Router } from 'express'

import ProductCtrl from '../../controllers/products/product.ctrl'
import AuthUserMiddleware from '../../middleware/auth/auth_user'
import StoreValidation from '../../middleware/validation/product/store.validation'

const _productCtrl = ProductCtrl.getInstance()
const _storeValidation = new StoreValidation()
const _auth = new AuthUserMiddleware();
const router = Router()

router.get('/',_auth.verifyAuth,_productCtrl.index)
router.get('/:id',_auth.verifyAuth, _productCtrl.show)
router.post('/', _storeValidation.validData(), _storeValidation.validate, _auth.verifyAuth, _productCtrl.store)
router.put('/:id', _storeValidation.validData(), _storeValidation.validate, _auth.verifyAuth, _productCtrl.update)
router.delete('/:id', _auth.verifyAuth, _productCtrl.inactive)

export default router