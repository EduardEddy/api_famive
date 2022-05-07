import { Router } from 'express'
import Active from '../../controllers/auth/active_account'

const _active = new Active;

const router = Router()
router.post('/active-account',_active.active)
router.post('/new-code',_active.newCode)

export default router