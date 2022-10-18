import { Router } from "express";
import productsRouter from "./products.js";
import usersRouter from "./users.js";
import carritosRouter from "./carritosRoutes.js";
import chatRouter from "./chatRoutes.js";
import isAuth from "../utils/middleware/isAuthToken.js";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/api/users/login");
});

router.use('/productos', productsRouter)
router.use('/carritos',isAuth, carritosRouter)
router.use('/users',usersRouter)
router.use('/chat',chatRouter)

export default router;