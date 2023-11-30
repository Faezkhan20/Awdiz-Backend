
import ProductModals from "../Modals/Product.Modals.js";


export const getallProducts = async (req, res) => {
    try {
        const products = await ProductModals.find({})
        if (products.length) {
            res.status(200).json({ success: true, message: "Products Found.", products: products })
        }
        else {
            res.status(404).json({ sucess: false, message: "product Not Found!" })
        }
    } catch (error) {

    }
}
export const getSingleProduct = async (req, res) => {
    try {
        console.log("here")
        const { id: productId } = req.query;
        if (!productId) return res.status(404).json({ message: 'Product id is required.', success: false })

        const product = await ProductModals.findById(productId).select("-createdAt -updatedAt -__v ")
        if (product) {
            return res.status(200).json({ success: true, message: "Product found.", product: product })
        }
        return res.status(404).json({ success: false, message: "Product not found." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
        
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image, id } = req.body
        if (!name || !price || !category || !image) return res.status(404).json({ success: false, message: "All field are required" })

        const Product = new ProductModals({
            name, price, category, image: image, userId: id
        })
        console.log(Product, "product here")
        const ress = await Product.save();
        console.log(ress, "Respone from mongodb")

        return res.status(201).json({ success: true, message: "Product added successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const filterProducts = async (req, res) => {
    try {
        const { skip = 0, page = 10, query } = req.body

        const updatedQuery = {}
        updatedQuery.category = query;

        const products = await ProductModals.find(updatedQuery).skip(skip * 10).limit(page)

        return res.status(200).json({ succes: true, message: "Products found.", products })
    } catch (error) {
        return res.status(500).json({ message: error, success: false });
    }
}
export const yourProducts = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(404).json({ message: "Id not found." })

        const allproducts = await ProductModals.find({ userId: id })
        return res.status(200).json({ success: true, products: allproducts })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { name, price, category, image, _id } = req.body.productData;
        if (!name || !price || !category || !image || !_id) return res.status(404).json({ success: false, message: "All fields are required." })

        await ProductModals.findByIdAndUpdate(_id, { name, price, category, image })

        return res.status(200).json({ success: true, message: "Product Updated successfully." })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(404).json({ message: "Id not found." })

        await ProductModals.findByIdAndRemove(id)
        return res.status(200).json({ success: true, message: "Product deleted successfully." })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}