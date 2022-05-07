import { Router } from "express";
import Auth from '../../controllers/auth/login'

const _auth = new Auth;

const router = Router()
router.post('/login',_auth.login)

export default router;