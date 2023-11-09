import {Router} from 'express'
import { addProduct, filterProducts, getSingleProducts, getallProducts } from '../Controllers/Product.controller.js';
import { checkUserID } from '../Middlewares/AllMiddleware.js';

const router = Router();

router.post("/add-product",checkUserID ,addProduct)
router.get("/get-single-product" , getSingleProducts);
router.get("/filter-products", filterProducts)
router.get("/get-all-product", getallProducts)




export default router;