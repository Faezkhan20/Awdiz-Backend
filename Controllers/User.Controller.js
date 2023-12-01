import ProductModals from "../Modals/Product.Modals.js";
import UserModals from "../Modals/User.modals.js";


export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        if (!productId || !userId) return res.status(404).json({ success: false, message: "User and Product are mandatory.." })
        const user = await UserModals.findByIdAndUpdate({ _id: userId }, { $push: { cart: productId } })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }
        return res.status(200).json({ success: true, message: "Product added to cart successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getYourCartProduct = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(404).json({ success: false, message: "User Id is required." })

        const user = await UserModals.findById(userId)
        // console.log(user.cart,"caart")

        if (user) {
            var finalproduct = []
            for (var i = 0; i < user.cart.length; i++) {
                // console.log(user.cart[i],"user cart i")
                const productData = await ProductModals.findById(user.cart[i])
                finalproduct.push(productData)

            }
            return res.status(200).json({ success: true, message: "product found", products: finalproduct })

            // console.log(products.cart)
        }




    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { productId, userId } = req.body
        console.log(productId,"productid")
        if (!productId || !userId) return res.status(404).json({ success: false, message: "User and Product are mandatory.." })
        const user = await UserModals.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })

        const index = user.cart.indexOf(productId);
        user.cart.splice(index, 1)
        await user.save()
          const finalproduct=[]
        for (var i = 0; i < user.cart.length; i++) {
            // console.log(user.cart[i],"user cart i")
            const productData = await ProductModals.findById(user.cart[i])
            finalproduct.push(productData)
        }
        return res.status(200).json({ success: true, message: "product found", products: finalproduct })


    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }

}