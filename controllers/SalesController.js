var {getSalesModel}=require("../models/salesModel");
var SalesColRef=getSalesModel(); //get user model returns the refernce of the object usercolref jo humne return kiya hai

function doSaveSalesWithPost(req, resp)
{
    console.log(req.body);
    var SalesObj=new SalesColRef(req.body);
    SalesObj.save().then((document)=>{
            //resp.send(document)
            resp.json({doc:document,status:true,msg:"Saved Successfully With Post"});

    }).catch((err)=>{
            console.log(err.message);
            //resp.send(err.message)
            resp.json({status:false,msg:err.message});

    })
}

module.exports={doSaveSalesWithPost}