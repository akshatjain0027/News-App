var express = require("express")
var axios = require("axios");
var Newsapi = require('newsapi');
var cors = require("cors");

var apiKey = "a8265d16fe27458cb73514c24db2b5e1";
var app = express();
var newsapi = new Newsapi(apiKey);
app.use(cors());

const port=process.env.PORT||3000;

app.get("/covid19",function(req, res){
    var data = {};
    axios("https://api.covid19api.com/summary")
        .then(response =>{
            data.Global = response.data.Global
            data.Countries = response.data.Countries
            res.json(data)
            // res.send(data)
        })   
})

app.get("/topheadlines", function(req, res){
    newsapi.v2.topHeadlines({
        country: 'in'
    }).then(response => {
        res.send(response)
    })
})

app.get("/everything", function(req, res){
    newsapi.v2.everything({
        language: "en"
    }).then(response => {
        res.send(response)
    })
})

// server at port 3000
app.listen(port, function(){
    console.log("YelpCamp server has started")
})