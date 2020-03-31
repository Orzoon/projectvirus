const express = require("express");
const mapRoutes = express.Router();

const dataFunction = require("../info/info");

mapRoutes.get("/latestStatByCountryName/:countryName", (req,res) => {
    const URI = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php";

    const {countryName} = req.params;
    /*------------
    validateCountryName
    and throw Error if no country Name
    ------------*/
    dataFunction.processDataFunction(URI, null, function(requestedData){
        if(!requestedData.error){
            return res.status(200).send(requestedData.data)
        }
        return res.status(500).send(requestedData.error)
    })
})

mapRoutes.get("/casesByCountry", (req,res) => {
    const URI ="https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php"

    /*------------
    validateCountryName
    and throw Error if no country Name
    ------------*/
    dataFunction.processDataFunction(URI, null, function(requestedData){
        if(!requestedData.error){
            return res.status(200).send(requestedData.data)
        }
        return res.status(500).send(requestedData.error)
    })
})

mapRoutes.get("/affectedCountry", (req,res) => {
    const URI = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php";

    /*------------
    validateCountryName
    and throw Error if no country Name
    ------------*/
    dataFunction.processDataFunction(URI, null, function(requestedData){
        if(!requestedData.error){
            return res.status(200).send(requestedData.data)
        }
        return res.status(500).send(requestedData.error)
    })
})

mapRoutes.get("/worldTotalStat", (req,res) => {
    const URI = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php";
    /*------------
    validateCountryName
    and throw Error if no country Name
    ------------*/
    dataFunction.processDataFunction(URI, null, function(requestedData){
        if(!requestedData.error){
            return res.status(200).send(requestedData.data)
        }
        return res.status(500).send(requestedData.error)
    })
})

module.exports = mapRoutes;