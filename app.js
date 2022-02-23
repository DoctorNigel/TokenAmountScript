const fs = require('fs');
const express = require('express')
const readline = require('readline');
const axios = require("axios").default;
const {parse} = require("csv-parse")
var csv = require("csvtojson");
const { NFTStorage, File} = require("nft.storage")

const arrayToTxtFile = require('array-to-txt-file');
const { waitForDebugger } = require('inspector');
const { dirname } = require('path');

const FileTest = async () => {

    var stringArray = []

    for (var i=0; i<=9999; i++) {
        stringArray[i] = String(i).padStart(4, '0')
    }
    console.log(stringArray)
    
    var urlArray = []
    var serialNumbersList = []
    
    //console.log(ipfsLinksWithDoubles.length)
    // create an array of strings with 4 pad based numbers

    var csvToJson = {}

    await csv()
        .fromFile("raffle_4.csv")
        .then(function(jsonArrayObject) {
            //console.log(jsonArrayObject.length)
            csvToJson = jsonArrayObject
        })

    console.log(csvToJson)
    var accountIdList = []
    var discordNameList = []
    var cleanedJsonArray = []
    var outliers = ["0.0.586912", "0.0.584180", "0.0.5829654", "0.0.585684"]


    for (var entry of csvToJson) {
        console.log(entry["What is your Discord ID (example: DupeGlava#6071)"])
        var accountId = entry["Type your account id where your BarPunk(s) reside (example: 0"][0]["123456)"]
        console.log(accountId)

        if (!(outliers.indexOf(accountId) > -1)) {
            const responseObject = await axios.get("https://mainnet-public.mirrornode.hedera.com/api/v1/balances?account.id=" + accountId, {responseType: "json"})
            //console.log("This is user: " + discordNameList[finalAccountIdList.indexOf(accountId)])
            if (responseObject.data.balances[0]["tokens"]) {
                var tokenAmount = responseObject.data.balances[0]["tokens"]
                tokenAmount.forEach(element => {
                    
                    if (element["token_id"] === "0.0.539427") {
                        //console.log(Array(element["balance"]).fill(accountId))
                        //raffleAccountIdList = raffleAccountIdList.concat(Array(element["balance"]).fill(accountId))
                        //console.log("We're dealing with accountId: " + accountId)
                        console.log(element["balance"])
                    }
                    
                });
            } else {
                console.log("Some suspicious activity here")
                console.log(accountId)
            }
        }
        
        //accountIdList.push(entry["Type your account id where your BarPunk(s) reside (example: 0"][0]["123456)"])
        //discordNameList.push(entry["What is your Discord ID (example: DupeGlava#6071)"])
    }
    console.log(accountIdList)
    var outliers2 = ["0.0.586912", "0.0.584180", "0.0.638628", "0.0.620808", "0.0.495570", "0.0.484814", "0.0.601681", "0.0.473489", "0.0.5829654"]
    var finalAccountIdList = accountIdList.filter(value => !outliers2.includes(value))
    finalAccountIdList.push("0.0.582965")
    var raffleAccountIdList = []
    var responseObjectList = []
    
    /*
    for (var accountId of finalAccountIdList) {
        const responseObject = await axios.get("https://mainnet-public.mirrornode.hedera.com/api/v1/balances?account.id=" + accountId, {responseType: "json"})
        console.log("This is user: " + discordNameList[finalAccountIdList.indexOf(accountId)])
        if (responseObject.data.balances[0]["tokens"]) {
            var tokenAmount = responseObject.data.balances[0]["tokens"]
            tokenAmount.forEach(element => {
                
                if (element["token_id"] === "0.0.539427") {
                    //console.log(Array(element["balance"]).fill(accountId))
                    //raffleAccountIdList = raffleAccountIdList.concat(Array(element["balance"]).fill(accountId))
                    console.log("We're dealing with accountId: " + accountId)
                    console.log(element["balance"])
                }
                
            });
        } else {
            console.log("Some suspicious activity here")
            console.log(accountId)
        }
        
    }
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    shuffle(raffleAccountIdList)
    console.log(raffleAccountIdList)
    //var randomizedWinner = raffleAccountIdList[Math.floor(Math.random()*raffleAccountIdList.length)]
    //console.log(randomizedWinner)
    */
    
}

FileTest();