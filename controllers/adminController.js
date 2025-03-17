var { getUserModel } = require('../models/userModel');
var applicantColRef = getUserModel();
var path = require('path');
const { response } = require('express');
async function generateNanoId() {
    const { nanoid } = await import('nanoid');
    return nanoid(10);
}
const nodemailer = require('nodemailer');


async function getAllApplicants(req, res) {
    try {
        let applicants = await applicantColRef.find({});
        res.send(applicants);
    } catch (error) {
        res.send(error.message);
    }
}

async function doApprove(req, res) {
    try{
        let result = await applicantColRef.updateOne({uid : req.body.uid}, {$set : {status : 1}});
        if(result.modifiedCount > 0)
            res.send("Application Approved");
        else
            res.send("Application not found");
    } catch (error) {
        res.send(error.message);
    }
}
async function doDecline(req, res) {
    try {
        let result = await applicantColRef.updateOne({ uid: req.body.uid }, { $set: { status: -1 } });
        if (result.modifiedCount > 0)
            res.send("Application Declined");
        else
            res.send("Application not found");
    } catch (error) {
        res.send(error.message);
    }
}
async function doFranchise(req, res) {
    try {
        let user = await applicantColRef.findOne({ uid: req.body.uid });
        if (!user) {
            return res.send("Application not found");
        }
        
        if (user.status !== 1) {
            return res.send("Franchise cannot be allotted. Application is not approved.");
        }
        let result = await applicantColRef.updateOne({ uid: req.body.uid }, { $set: { status: 2 } });
        if (result.modifiedCount > 0)
            res.send("Franchise Alloted!");
        else
            res.send("Failed to allot franchise");
    } catch (error) {
        res.send(error.message);
    }
}


// async function doFranchise(req, res) {
//     try {
//         const uid = req.body.uid;
//         const nanoIdGenerated = await generateNanoId(); // Generate NanoID dynamically

//         // Update the applicant in the database with franchise status and NanoID as password
//         let result = await applicantColRef.updateOne(
//             { uid: uid },
//             { $set: { status: 2, password: nanoIdGenerated } },
//             console.log(nanoIdGenerated)
//         );

//         if (result.modifiedCount > 0) {
//             // Fetch email of the user
//             let user = await applicantColRef.findOne({ uid: uid });

//             if (user && user.uid) {
//                 // Setup email transporter
//                 let transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     secure:true,
//                     port:465,
//                     auth: {
//                         user: 'priyankakansal619@gmail.com', // Replace with your email
//                         pass: 'ffdfrlattmlfaqzp' // Replace with your email password
//                     }
//                 });

//                 // Email message
//                 let mailOptions = {
//                     from: 'priyankakansal619@gmail.com',
//                     to: user.uid,
//                     subject: 'Franchise Allotted - Credentials',
//                     text: `Congratulations! Your franchise has been allotted.\n\nEmail: ${user.uid}\nPassword: ${nanoIdGenerated}\n\nUse these credentials to log in.`
//                 };

//                 // Send email
//                 await transporter.sendMail(mailOptions);
//                 res.send("Franchise Allotted! Credentials sent via email.");
//             } else {
//                 res.send("Franchise allotted, but email not found.");
//             }
//         } else {
//             res.send("Failed to allot franchise.");
//         }
//     } catch (error) {
//         res.send(error.message);
//     }
// }


module.exports = {getAllApplicants,doApprove,doDecline, doFranchise};