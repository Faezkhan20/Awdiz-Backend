
import ProductModals from "../Modals/Product.Modals.js";


export const getallProducts = async (req, res) => {
    try{
        const products = await ProductModals.find({})
        if(products.length){
            res.status(200).json({success : true , message : "Products Found." , products:products})
        }
        else{
            res.status(404).json({sucess : false , message : "product Not Found!"})
        }
    }catch(error){
        
    }
}
export const getSingleProducts =  async (req, res) => {
    try{
        const {ProductId} = req.body

        if(!ProductId) return res.send(404).json({success : false , message : "Product ID is required"})
        const product = await ProductModals.findById(ProductId).select("-createdAt -updatedAt -__v");
        if(product){
            return res.status(200).json({success : true , message : "Product Found." , product})
        }
        return res.status(404).json({sucess : false , message : "Product Not found"})
    }catch(error){
        res.status(500).json({sucess : false , message : error})
    }
}
export const addProduct = async (req,res)=>{
try{
const {name,price,category,image,id}=req.body
if(!name || !price || !category || !image) return res.status(404).json({success:false,message:"All field are required"})

const Product= new ProductModals({
    name , price, category,image:image,userId:id
})
console.log(Product,"product here")
const ress=await Product.save();
console.log(ress,"Respone from mongodb")

return res.status(201).json({success:true,message:"Product added successfully"})
}catch(error){
    return res.status(500).json({success : false , message : error})
}
}
export const filterProducts = async (req , res) => {
    try{
        const {skip = 0 , page = 10 , query} = req.body

        const updatedQuery = {}
        updatedQuery.category = query; 

        const products = await ProductModals.find(updatedQuery).skip(skip * 10).limit(page)

        return res.status(200).json({succes : true , message : "Products found.", products})
    }catch(error){
        return res.status(500).json({ message: error, success: false });
    }
}