import {Router} from 'express'
import { addProduct, deleteProduct, filterProducts, getSingleProduct, getallProducts, updateProduct, yourProducts } from '../Controllers/Product.controller.js';
import { checkUserID } from '../Middlewares/AllMiddleware.js';

const router = Router();

router.post("/add-product",checkUserID ,addProduct)
router.get("/get-single-product" , getSingleProduct);
router.get("/filter-products", filterProducts)
router.get("/get-all-product", getallProducts)
router.post('/your-products', yourProducts)
router.post('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)




export default router;