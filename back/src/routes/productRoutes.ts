import productHandler from "../controllers/productHandler";
import accessMiddleware from "../middleware/accessMiddleware";
import { Router } from "express";

const productRouter = Router();

productRouter.post('/create', accessMiddleware.adminValidation, productHandler.createProduct);
productRouter.get('/active', productHandler.getActiveProducts);
productRouter.put('/update/:id', accessMiddleware.adminValidation, productHandler.updateProduct);
productRouter.delete('/delete/:id', accessMiddleware.adminValidation, productHandler.deleteProduct);
productRouter.delete('/delete/detail/:id', accessMiddleware.adminValidation, productHandler.deleteDetail);
productRouter.get('/:id', productHandler.getProductById);
productRouter.get('/', accessMiddleware.accessValidation, productHandler.getAllProducts)

export default productRouter;