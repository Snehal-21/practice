import express from "express";
import { addProduct, filterPrice, pagination, register } from "../controllers/userControllers.js";
import { checkRole, checks } from "../middlewares/authMiddlewares.js";
import { bcryptRegister, checkBcrypt } from "../controllers/bcrypt.js";

const router=express.Router();

router.post('/register',checks,register);
router.post('/addProduct',checkRole,addProduct);
router.post('/pagination', pagination);
router.post('/filterPrice',filterPrice);


router.post("/bcrypt", bcryptRegister)
router.post("/checkBcrypt", checkBcrypt);
export default router;