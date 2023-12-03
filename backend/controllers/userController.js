const catchAsync = require("../utils/catchAsync")
const User = require("./../model/userModel")

exports.getUsers = catchAsync(async (req,res)=>{
    const users = await User.find()
    res.status(200).json({
        status: "ok",
        length: users.length,
        data:{
            users
        }
    })
})

exports.getUserRole = catchAsync(async (req,res)=>{
    const {email} = req.body
    const user = await User.findOne({email})

    // console.log(user)
    res.status(200).json({
        status: "ok",
        role: user.role
    })
})