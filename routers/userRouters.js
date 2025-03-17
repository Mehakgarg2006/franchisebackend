var express = require("express");
var userRouter = express.Router();
var obj=require("../controllers/userControllers")


userRouter.post("/saveuserwithpost",obj.doSaveUserWithPost);



module.exports=userRouter