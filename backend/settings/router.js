const express = require('express')
const {resetUserName , resetPassword}= require('./userControllers')
const setRouter = express.Router()


setRouter.post('/reset-user-name' , resetUserName )
setRouter.post('/reset-user-password', resetPassword)


module.exports = setRouter 