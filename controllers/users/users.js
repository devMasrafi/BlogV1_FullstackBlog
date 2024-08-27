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

        // save the user in session
        req.session.userAuth = userFound._id;
        console.log(req.session);
        


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
        // get userID from params
        const userId = req.params.id
        // find user
        const user = await User.findById(userId)
        
        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.json(error)
    }
}

// profileDetails
const profileDetailsCtrl = async(req, res) =>{
    try{
        // get the login user
        const userID = req.session.userAuth
        // find user
        const user = await User.findById(userID)
        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.json(error)
    }
}

// profile photo upload 
const profilePhotoCtrl = async(req, res, next) =>{
    console.log(req.file.path);
    
    try{
        // find user to be uploaded
        const userId = req.session.userAuth
        const userFound = await User.findById(userId)

        // check user found
        if(!userFound){
            return next(appErr("User not found", 403))
        }
        // update profile
        await User.findByIdAndUpdate(userId,{
            profileImg: req.file.path
        },{
            new: true
        })
        

        res.json({
            status: "success",
            user: "You have successfully updated your profile photo"
        })
    } catch (error) {

        next(appErr(error.message))
    }
}

// cover photo 
const coverPhotoCtrl =  async(req, res, next) =>{
    try{
        // find user to be updated
        const userId= req.session.userAuth
        const userFound = await User.findById(userId)
        // check user not found
        if (!userFound) {
            next(appErr("User not Found", 403))
        }
        // update cover image/photo
        await User.findByIdAndUpdate(userId,{
            coverImg: req.file.path
        },{
            new: true
        })

        res.json({
            status: "success",
            user: "Cover image updated successfully"
        })
    } catch (error) {
       next(appErr(error.message))
    }
}

// update password 
const updatePassCtrl = async(req, res, next) =>{
    const {password} = req.body
    try{
        // check pasword is updateing then hash
        if(password){
            const salt = await bcypt.genSalt(10)
            const passwordHashed = await bcypt.hash(password, salt)
            // update user
            await User.findByIdAndUpdate(req.params.id,
                {
                    password: passwordHashed
                },
                {
                    new: true
                }
            )

            res.json({
                status: "success",
                user: "Password has been changed successfully"
            })
        }
 
    } catch (error) {
        return next(appErr("Please provide password field"))
    }
}

// user Update
const userUpdateCtrl = async(req, res, next) =>{
    const {fullname, email} = req.body
    try{
        //check email is taken
        const emailTaken = await User.findOne({email})
        if (emailTaken) {
            return next(appErr("email is taken", 400))
        }
        // update user otherwise
        const user = await User.findByIdAndUpdate(req.params.id,
            {
                fullname,
                email
            },
            {
                new: true
            }
        )

        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.json(next(appErr(error.message)))
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