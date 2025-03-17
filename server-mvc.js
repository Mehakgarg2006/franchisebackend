var express = require("express");
var fileuploader = require("express-fileupload");
var mongoose = require("mongoose");
var cors = require("cors");
var path = require("path");
var app = express();
var dotenv=require("dotenv");

app.use(cors());
app.use(express.json());

app.listen(2006, function () {
    console.log("Server Started...");
})
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());

var {url}=require("./config/config");

// Cloudinary requires .v2





var urll=url;

mongoose.connect(urll).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err.message);
})


var userRouter=require("./routers/userRouters");
app.use("/user",userRouter)

var adminRouter=require("./routers/adminRouters");
app.use("/admin",adminRouter)

var SalesRouter=require("./routers/SalesRouters");
app.use("/sales",SalesRouter)

var franchisses_router=require("./routers/franchisses_router");
app.use("/franchisees",franchisses_router);

var franData_router=require("./routers/franData_router");
app.use("/franData",franData_router);

var auth_router = require("./routers/auth_router");
app.use("/auth", auth_router);

var admin_login = require("./routers/adminloginrouter");
app.use("/adminlogin", admin_login);