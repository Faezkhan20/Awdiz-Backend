import { Router } from "express";
import { addCart } from "../Controllers/User.Controller.js";

const router = Router();

router.post('/add-cart', addCart)


export default router;