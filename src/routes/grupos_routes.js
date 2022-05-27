import { Router } from "express";
import { auth } from "../../middelware/auth";
import {crear_grupos } from "../controllers/grupos_control";

const router = Router()

router.use(auth);
router.post('/crear_grupos', crear_grupos);

export default router