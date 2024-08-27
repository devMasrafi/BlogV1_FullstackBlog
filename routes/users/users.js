const express = require('express')
const multer = require('multer')
const { registerCtrl, loginCtrl, userDetailsCtrl, profileDetailsCtrl, profilePhotoCtrl, coverPhotoCtrl, updatePassCtrl, userUpdateCtrl, logoutCtrl } = require('../../controllers/users/users')
const protected = require('../../middlewares/protected')
const storage = require('../../config/cloudinary')


const userRoutes = express.Router()
// instance of multer
const upload = multer({storage})



// register
userRoutes.post('/register', registerCtrl)

// POST/api/v1/users/login
userRoutes.post("/login", loginCtrl)


// GET/api/v1/users/profile/:id (Profile.userPrivate)
userRoutes.get ("/profile/",protected, profileDetailsCtrl)

// GET/api/v1/users/:id (details about user.public)
userRoutes.get ("/:id", userDetailsCtrl)

// put/api/v1/users/profile-upload/:id (profile image Upload)
userRoutes.put ("/profile-photo-upload/",upload.single("profile"),protected , profilePhotoCtrl)

// put/api/v1/users/cover-photo-upload/:id (cover image upload)
userRoutes.put ("/cover-photo-upload/",upload.single("coverPhoto"), protected ,coverPhotoCtrl)

// put/api/v1/users/update-password/:id (User password update)
userRoutes.put ("/update-password/:id", updatePassCtrl)

// put/api/v1/users/update/:id 
userRoutes.put ("/update/:id", userUpdateCtrl)

// GET/api/v1/users/logout
userRoutes.get ("/logout", logoutCtrl)


module.exports = userRoutes