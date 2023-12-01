import { Router } from "express";
import { addCart, getYourCartProduct,deleteCart } from "../Controllers/User.Controller.js";

const router = Router();

router.post('/add-cart', addCart)
router.post('/add-cart-product', getYourCartProduct)
router.post('/delete-cart',deleteCart)


export default router;