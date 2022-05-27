import { Router } from "express";
import { auth } from "../../middelware/auth";
import { getPrueba, login, register} from "../controllers/users_control";

const router = Router()

router.post('/login', login);
router.post('/register', register);
router.use(auth);
router.get('/', getPrueba);

export default router