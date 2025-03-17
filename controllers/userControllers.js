var {getUserModel}=require("../models/userModel");
var path=require ("path");
var UserColRef=getUserModel(); //get user model returns the refernce of the object usercolref jo humne return kiya hai
var jwt=require("jsonwebtoken");

function doSaveUserWithPost(req, resp)
{
    console.log(req.body);
    req.body.picpath=req.body.ppic;
    req.body.status=0;
    var userObj=new UserColRef(req.body);
    userObj.save().then((document)=>{
            //resp.send(document)
            resp.json({doc:document,status:true,msg:"Saved Successfully With Post"});

    }).catch((err)=>{
            console.log(err.message);
            //resp.send(err.message)
            resp.json({status:false,msg:err.message});

    })
}

module.exports={doSaveUserWithPost}