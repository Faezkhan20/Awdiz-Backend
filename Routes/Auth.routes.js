import {Router} from "express"
import { Login, Register, getCurrentUser } from "../Controllers/Auth.controller.js";

const router = Router();

router.post("/login" , Login)

router.post("/register",Register)

router.post("/get-current-user", getCurrentUser);

export default router