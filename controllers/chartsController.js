var {getSalesModel} = require('../models/salesModel');
var SalesColRef = getSalesModel();



function getSalesCharts(req, resp) {
    SalesColRef.find().then((charts) => {
        console.log('Query Results:', charts);
        if (!charts || charts.length === 0) {
            console.warn('No sales data found in database');
        }
        // Transform data into format expected by Charts component
        const transformedData = charts.map(item => ({

            Sales: item.Sales ,
            Customer: item.Customer ,
        }));
        resp.send(transformedData);
    }).catch((err) => {
        console.log(err.message);
        resp.status(500).send(err.message);
    })
}


module.exports = { getSalesCharts }
