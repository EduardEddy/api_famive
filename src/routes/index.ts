import userRoutes from './users/user.route'
import authRoutes from "./auth/auth";
import storeRoute from './stores/store.route'
import productRoute from './product/product.route'
import eventRouter from './event/event.route'
import activeAccount from './auth/active'
import imageRoute from './image/image.route'
import recoveryPassword from './auth/recovery_password'

export {
    userRoutes, authRoutes, 
    storeRoute, productRoute, 
    eventRouter, activeAccount, 
    imageRoute, recoveryPassword
}
