import {Router} from 'express'
import AuthRouters from './Auth.routes.js';
import productrouter from './Products.routes.js'


const router = Router()

router.use( "/auth", AuthRouters)

router.use("/product",productrouter)

export default router;