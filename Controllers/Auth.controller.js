import UserModals from "../Modals/User.modals.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;
        if (!email || !password) return res.status(401).json({ success: false, message: "All fields are manmdatory.." })

        const user = await UserModals.findOne({ email: email });
        // console.log(user, "user")

        if (!user) return res.status(401).json({ success: false, message: "Email is wrong.." });

        const isPasscorrect = await bcrypt.compare(password, user.password);
        // console.log(isPasscorrect, "check here")
        if (!isPasscorrect) {
            return res.status(401).json({ success: false, message: "Passwprd is wrong." })
        }
        // generate token

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        // console.log(token, "token")

        return res.status(200).json({ success: true, message: "Login successfull.", user: { name: user.name, id: user._id }, token })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const Register = async (req, res) => {
    // res.send("Hello from login") 
    try {
        // console.log(req.body, "Body");
        const { name, email, password} = req.body.userData;

        const hashedPassword = await bcrypt.hash(password , 10);

        // console.log(hashedPassword);

        if (!name || !email || !password) return res.status(401).json({ sucess: false, message: "All Fields are mandatory." })

        const user = new UserModals({
            name: name,
            email,
            password : hashedPassword
            
        })

        await user.save();

        return res.status(200).json({ success: true, message: "Registration Succesfull." })

    } catch (error) {
        return res.status(500).json({ sucess: false, message: error })
    }
}
export const getCurrentUser = async (req , res) => {
    try{
        const {token} = req.body
    
        if(!token) return res.status(401).json({success : false , message : "token is required"})

        const {id} = await jwt.verify(token , process.env.JWT_SECRET);

        console.log(id , "id")

        const user = await UserModals.findById(id);

        if(!user) return res.status(401).json({success : false , message : "User not Found"})

        return res.status(200).json({success : true , user : {name : user.name , id : user._id}})


    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}