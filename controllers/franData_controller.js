var { getUserModel } = require("../models/franData_model");
var UserColRef = getUserModel();
// const bcrypt = require("bcrypt");


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


async function getChartsdata(req, res) {
    const { uid, startDate, endDate } = req.query;

    if (!uid || !startDate || !endDate) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        console.log("Fetching sales data for UID:", uid, "from", startDate, "to", endDate);

        const salesData = await UserColRef.find({
            uid: uid,
            dos: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).sort({ dos: 1 }).lean();

        console.log("Raw Sales Data from DB:", salesData);

        if (!salesData.length) {
            console.log("No sales data found for the given UID and date range.");
            return res.json([]);
        }

        // Format data properly
        const formattedSalesData = salesData.map(item => ({
            date: item.dos.toISOString().split("T")[0], // Convert date to YYYY-MM-DD
            sale: item.sale || 0,  
            cust: item.cust || 0   
        }));

        console.log("Formatted Sales Data:", formattedSalesData);

        res.json(formattedSalesData);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = { saveFranData, getAllFranData ,getChartsdata};