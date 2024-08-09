import axios from 'axios'
import { Product } from '../db'

const backUrl = process.env.BACK_URL


async function deleteSpaces() {
    const response = await axios.get(`${backUrl}/product/active`)
    const products = response.data

    let count = 0

    try {
        for (const product of products) {
            const newname = product.name.trimLeft(' ')
            product.name = newname;
            const productDB = await Product.findByPk(product.id)
            await productDB!.update(product)
            count += 1;


        }

    } catch (error) {
        console.log('ha habido un error')

    }

}

export default deleteSpaces;