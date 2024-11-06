import { Product, ProductDetail } from "../db";
import { Response, Request } from "express";
import { Op } from "sequelize";


const createProduct = async (req: Request, res: Response) => {
    const oneProduct = req.body;

    try {
        const productExist = await Product.findOne({
            where: {
                name: oneProduct.name
            }
        })
        if (!productExist) {
            const productCreated = await Product.create({
                price: oneProduct.price,
                name: oneProduct.name,
                description: oneProduct.description,
                active: oneProduct.active,
                category: oneProduct.category,
            })
            for (const oneColor of oneProduct.details) {
                await ProductDetail.create({
                    color: oneColor.color,
                    stock: oneColor.stock,
                    image: oneColor.image,
                    productId: productCreated.id,
                    size: oneColor.size,
                })
            }
            res.status(201).send('Producto añadido')
        } else {
            res.status(400).send('Producto existente, revisa el stock')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    try {
        const productExist: Product | null = await Product.findOne({
            where: {
                id: id
            },
            include: ProductDetail
        })

        if (productExist) {
            const updateData: Record<string, any> = {}
            const newDetails = data.details || []

            const existingDetails = await ProductDetail.findAll({
                where: {
                    productId: productExist.id
                }
            });

            // Eliminar detalles que no están en los nuevos detalles
            for (const existingDetail of existingDetails) {
                const found = newDetails.find((detail: any) => detail.color === existingDetail.color);
            
                if (!found) {
                    await existingDetail.destroy();
                }
            }

            // Actualizar o crear nuevos detalles
            for (const detail of newDetails) {
                const existingDetail = await ProductDetail.findOne({
                    where: {
                        productId: productExist.id,
                        color: detail.color
                    }
                });

                if (existingDetail) {
                    await existingDetail.update(detail);
                } else {
                    await ProductDetail.create({
                        ...detail,
                        productId: productExist.id
                    });
                }
            }

            // Actualizar otros campos del producto
            for (const key in data) {
                if (key !== 'details') {
                    updateData[key] = data[key];
                }
            }

            await productExist.update(updateData)
            const newList = Product.findAll({
                include: ProductDetail
            })
            res.status(200).json(newList)
        } else {
            res.status(404).send('Hubo un error al encontrar el producto')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const productExist = await Product.findByPk(id)
        console.log("productExist", productExist)
        if (productExist) {
            await productExist.destroy({force:true})
            res.status(200).send('El producto ha sido eliminado')
        } else {
            res.status(404).send('Hubo un error al buscar el producto')
        }
    } catch (error) {
        res.status(500).send('server error')

    }
}

const deleteDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const detailExist = await ProductDetail.findOne({
            where: {
                productId: id,
                color: data.color
            }
        })
        if (detailExist) {
            await detailExist.destroy({ force: true })
            return res.status(200).send("Detalle eliminado")
        } else {
            return res.status(404).send("Detalle inexistente")
        }
    } catch (error) {
        return res.status(500).json(error)

    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            include: ProductDetail
        })
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getActiveProducts = async (req: Request, res: Response) => {
    try {
        const activeProducts = await Product.findAll({
            where: {
                active: true
            },
            include: {
                model: ProductDetail,
                where: {
                    stock: {
                        [Op.gt]: 0
                    }
                }
            }
        })
        res.status(200).json(activeProducts)
    } catch (error) {
        res.status(500).json(error)
    }

}

const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: {
                id: id,
            },
            include: {
                model: ProductDetail,
                where: {
                    stock: {
                        [Op.gt]: 0
                    }
                }
            }
        })
        if (product) {
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
const fetchProductById = async (id) => {
    try {
      return await Product.findOne({
        where: { id },
        include: {
          model: ProductDetail,
          where: {
            stock: {
              [Op.gt]: 0
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
      return null; // O puedes lanzar un error si prefieres manejarlo en la llamada.
    }
  };

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getActiveProducts,
    deleteDetail,
    fetchProductById
} 