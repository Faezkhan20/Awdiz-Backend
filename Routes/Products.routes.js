import {Router} from 'express'
import { addProduct } from '../Controllers/Product.controller.js';
import { checkUserID } from '../Middlewares/AllMiddleware.js';

const router = Router();

router.post("/add-product",checkUserID ,addProduct)


export default router;