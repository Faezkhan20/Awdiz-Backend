
import ProductModals from "../Modals/Product.Modals.js";


export const getAllproduct =(req,res)=>{
    res.send("Allll product");
}
export const getSingleproduct =(req,res)=>{
    res.send("Single product");
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