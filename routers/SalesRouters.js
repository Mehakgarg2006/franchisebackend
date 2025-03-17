var express = require("express");
var SalesRouter = express.Router();
var obj = require("../controllers/SalesController");
var chartsController = require("../controllers/chartsController");


SalesRouter.post("/savesaleswithpost", obj.doSaveSalesWithPost);
SalesRouter.get("/salescharts", chartsController.getSalesCharts);



module.exports = SalesRouter
