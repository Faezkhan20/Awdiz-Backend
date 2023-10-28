import UserModals from "../Modals/User.modals.js";

export const Login = (req, res) => {
    res.send("Hello from login")
}
export const Register = async (req, res) => {
    try {
        // console.log(req.body,"body")

        const { name, email, password, number } = req.body;
        // console.log("name =", name)
        if (!name || !email || !password || !number) return res.status(401).json({ success: false, message: "all field are mandatory" })

        const user = new UserModals({
            name: name,
            email: email,
            password: password,
            number 
        })

        await user.save()
        return res.status(200).json({ success: true, message: "registration successfull" })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error })
    }


}