var { getUserModel } = require("../models/franData_model");
var UserColRef = getUserModel();


function saveFranData(req, resp) {
    console.log(req.body);
    
    var userObj = new UserColRef(req.body);
    userObj.save().then((document) => {
        resp.json({ doc: document, status: true, msg: "Saved Successfully" });
    }).catch((err) => {
        console.log(err.message);
        resp.json({ status: false, msg: err.message });
    });
}


async function getAllFranData(req, resp) {
    try {
        let data = await UserColRef.find(); 
        resp.json(data);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        resp.status(500).json({ msg: "Internal Server Error" });
    }
}

// async function getChartsdata(req, res) {
//     const { format } = require("date-fns"); // Import date-fns for date formatting

// async function getChartsdata(req, res) {
//     const { uid, startDate, endDate } = req.query;

//     if (!uid || !startDate || !endDate) {
//         return res.status(400).json({ error: "Missing required parameters" });
//     }

//     try {
//         console.log("Fetching sales data for UID:", uid, "from", startDate, "to", endDate);

//         const salesData = await db.collection("sales_table")
//             .find({
//                 uid: uid,
//                 dos: { $gte: new Date(startDate), $lte: new Date(endDate) } // Convert input to Date objects
//             })
//             .sort({ dos: 1 })
//             .toArray();

//         // Convert ISODate to 'YYYY-MM-DD' format
//         const formattedSalesData = salesData.map(item => ({
//             date: format(new Date(item.dos), "yyyy-MM-dd"), // Convert ISODate to 'YYYY-MM-DD'
//             sale: item.sale
//         }));

//         console.log("Formatted Sales Data:", formattedSalesData);

//         res.json(formattedSalesData);
//     } catch (error) {
//         console.error("Error fetching sales data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// }

  
  



module.exports = { saveFranData, getAllFranData ,getChartsdata };
