import express from "express";
import { addProduct, filterPrice, pagination, register } from "../controllers/userControllers.js";
import { checkRole, checks } from "../middlewares/authMiddlewares.js";

const router=express.Router();

router.post('/register',checks,register);
router.post('/addProduct',checkRole,addProduct);
router.post('/pagination', pagination);
router.post('/filterPrice',filterPrice);
export default router;