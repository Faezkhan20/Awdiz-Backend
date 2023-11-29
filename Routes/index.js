import {Router} from 'express'
import AuthRouters from './Auth.routes.js';
import productrouter from './Products.routes.js'
import userRoutes from './User.routes.js';


const router = Router()

router.use( "/auth", AuthRouters)

router.use("/product",productrouter)
router.use("/user", userRoutes)

export default router;