var {getUserModel}=require("../models/franchisees_model");
var UserColRef = getUserModel();



function doLoginUser(req,resp)
{
    console.log(req.body);

    var userObj=new UserColRef(req.body);
    userObj.save().then((document)=>{
            //resp.send(document)
            resp.json({doc:document,status:true,msg:"Saved Successfully"});

    }).catch((err)=>{
            console.log(err.message);
            //resp.send(err.message)
            resp.json({status:false,msg:err.message});

    })

}




module.exports = { doLoginUser};