import {Router} from 'express'
import ProductsController from '../controllers/productsController.js'
import isAuth from "../utils/middleware/isAuthToken.js";

const router = Router()
const controllerProducts = new ProductsController()

// la primera ruta tambien deberia tener la funcion auth pero no se como integrarla al flujo con EJS. Por lo tanto la dejo no protegida para poder renderizar la vista.
router.get('/', controllerProducts.getProducts)
router.get('/:id', isAuth, controllerProducts.getProductById)
router.post('/', isAuth, controllerProducts.saveProduct)
router.put('/:id', isAuth, controllerProducts.updateProduct)
router.delete('/:id', isAuth, controllerProducts.deleteProduct)

export default router
