var mongoose = require("mongoose");

function getSalesModel() {
    var userScheema = mongoose.Schema;

    var SalesColSchema = {
        dos: { type: Date},
        Sales: String,
        Customer:String,

    }
    var ver = {
        versionKey: false, // to avoid __v field in table come by default
    }
    var SalesColShema = new userScheema(SalesColSchema, ver);
    // var SalesColRef = mongoose.model("Sales", SalesColShema)||  mongoose.models.Sales ;
    var SalesColRef = mongoose.models.Sales || mongoose.model("Sales", SalesColShema);
    
    //create collection in mongodb database

    return SalesColRef;
}
module.exports = { getSalesModel }