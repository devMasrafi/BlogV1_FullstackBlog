const bcypt = require("bcryptjs")
const User = require("../../model/user/User")
const appErr = require("../../utils/appErr")

// register
const registerCtrl = async(req, res, next) =>{
    const {fullname, email, password} = req.body
    // check if field is empty

    if(!fullname || !email || !password) {
        return next(appErr('all fields are required'))
    }


    try{
        // check the user exist(email)
        const userFound = await User.findOne({email})

        //Throw Error
        if(userFound){
            return res.json({status: "Failed", data: "User Already Exist"})
        }
        // Hash Passoword
        const salt = await bcypt.genSalt(10)
        const passwordHashed = await bcypt.hash( password, salt)


        // register user
        const user = await User.create({
            fullname, 
            email, 
            password: passwordHashed
        })



        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.json(error)
    }
}
// login
const loginCtrl = async(req, res, next) =>{
    const {email, password} = req.body

    if (!email || !password) {
        return next(appErr('Email and Password field are requierd'))
    }
    try{
        // check if the email exist
        const userFound = await User.findOne({email})
        if(!userFound){
            // throw an error
            return next(appErr('invalid login credentials'))

        }

        // password verify
        const isPasswordValid = await bcypt.compare(password, userFound.password)

        if (!isPasswordValid) {
            // throw an error
            return next(appErr('invalid login credentials'))
        }


        res.json({
            status: "success",
            data: userFound
        })
    } catch (error) {
        res.json(error)
    }
}
// userDetails
const userDetailsCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User Details"
        })
    } catch (error) {
        res.json(error)
    }
}

// profileDetails
const profileDetailsCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User profile Details"
        })
    } catch (error) {
        res.json(error)
    }
}

// profile photo upload 
const profilePhotoCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User profile image upload"
        })
    } catch (error) {
        res.json(error)
    }
}

// cover photo 
const coverPhotoCtrl =  async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User cover image upload"
        })
    } catch (error) {
        res.json(error)
    }
}

// update password 
const updatePassCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User password update"
        })
    } catch (error) {
        res.json(error)
    }
}

// user Update
const userUpdateCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User update"
        })
    } catch (error) {
        res.json(error)
    }
}

// logout 
const logoutCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "User logout"
        })
    } catch (error) {
        res.json(error)
    }
}



module.exports = {
    registerCtrl,loginCtrl,userDetailsCtrl, profileDetailsCtrl, profilePhotoCtrl, coverPhotoCtrl, updatePassCtrl, userUpdateCtrl, logoutCtrl
}