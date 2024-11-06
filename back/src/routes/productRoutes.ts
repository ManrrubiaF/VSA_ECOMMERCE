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
productRouter.get('/preview/:id', async (req, res) => {
    const productId = req.params.id;

    // Obtén los datos del producto desde tu base de datos o API
    const product = await productHandler.fetchProductById(productId);

    const defaultImage = "https://estudiosvsa.com.ar/assets/icons/vsaLOGO.jpg";
    const imageUrl = product?.details[0]?.image[0] || defaultImage;
    const frontendUrl = `https://estudiosvsa.com.ar/products/${product?.id}` || "https://estudiosvsa.com.ar/"

    if (product !== null) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <meta property="og:url" content="https://estudiosvsa.com.ar/products/${productId}" />
                <meta property="og:title" content="${product.name}" />
                <meta property="og:description" content="${product.description}" />
                <meta property="og:image" content="${imageUrl}" />                
                <meta property="og:type" content="website" />
                <title>${product.name}</title>
              </head>
              <body>
        <script>
          window.location.href = "${frontendUrl}";
        </script>
      </body>
            </html>
          `);
    } else {
        return res.status(404).send("not found")
    }


});

export default productRouter;