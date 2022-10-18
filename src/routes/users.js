import { Router } from "express";
import UsersController from "../controllers/usersControllers.js";

const router = Router();
const controllerUser = new UsersController()


/* Login */

router.get("/login", controllerUser.getLogin);
router.post("/login", controllerUser.postlogin) 
router.get("/errorLogin", controllerUser.errorLogin);

/* Registro */

router.get("/registro", controllerUser.getRegistro);
router.post("/registro", controllerUser.postRegistro);
router.get("/errorRegistro", controllerUser.errorRegistro);
router.get('/mailRegistro', controllerUser.mailRegistro);

/* Logout */

router.get("/logout", controllerUser.logout);


export default router;