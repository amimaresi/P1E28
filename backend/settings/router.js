const express = require('express')
const { resetUserName, resetPassword , updateProfileImage , upload } = require('./userControllers')
const setRouter = express.Router()
const {change_maj_time} = require('./changeTimeOfMaj')
const multer = require('multer')

const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')


 


setRouter.post('/reset-user-name',resetUserName)
setRouter.post('/reset-user-password', resetPassword)
setRouter.post('/update-profile-image', upload.single('img') ,updateProfileImage)
setRouter.post('/update-maj-time' , change_maj_time )


module.exports = setRouter 