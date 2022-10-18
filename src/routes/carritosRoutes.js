import { Router } from 'express';
import CartsController from '../controllers/cartsController.js';
const carritosRouter = Router();

const router = Router()
const controllerCarts = new CartsController()

router.get('/', controllerCarts.getCarts)
router.get('/:id', controllerCarts.getCartById)
router.get('/:id/productos', controllerCarts.getProductsInCart)
router.post('/', controllerCarts.saveCart)
router.post('/:id/productos', controllerCarts.addProductToCart)
router.delete('/:id/productos/:productoId', controllerCarts.deleteProductInCart)
router.delete('/:id', controllerCarts.deleteCart)


export default router;