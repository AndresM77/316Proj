var fs = require("fs");
var path = require("path");
var $ = (jQuery = require("jquery"));
const pool = require('./datastore/pgdb');
const uuidv5 = require('uuid/v5');
require("./node_modules/jquery-csv/src/jquery.csv");

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});

function ReadFile(file) {
    fs.readFile(file, "UTF-8", function(err, csv) {
        if(err) {
            console.log(err);
            return;
        }
        if(csv.indexOf("Temperature - (Celsius)") >= 0) {
            parseTemperature(csv);
        } else if (csv.indexOf("Rainfall - (MM)") >= 0) {
            parseRainfall(csv);
        } else {
            console.log("Error- wrong file type");
            return;
        }
    });
}

function ReadFilesFromDirectory(directory) {
    fs.readdir(directory, function(err, files) {
        if(err) {
            console.log(err);
            return;
        }
        files.forEach(file => {
            var fromPath = path.join(directory, file);
            ReadFile(fromPath);
        });
    });
}

function parseTemperature(csv) {
    var csv_no_space = csv.replace("- Celsius", "").replace(/ /g, "");
    var data = $.csv.toObjects(csv_no_space);
    var aggregate_data = {};
    for(var i=0;i<data.length;i++){ // for each obj
        var id = data[i].Year; // get id
        if(aggregate_data.hasOwnProperty(id)){ // if group is already created, add count
            aggregate_data[id].Temperature += data[i].Temperature / 12;         
        }else{ // else create group with same values
            aggregate_data[id] = {Temperature:data[i].Temperature / 12, Year: data[i].Year, ISO3: data[i].ISO3}
        }
    }

    Object.keys(aggregate_data).forEach((key) => {
        aggregate_data[key].Temperature = Number(aggregate_data[key].Temperature.toFixed(5));
    })

    console.log(aggregate_data)
    Object.values(aggregate_data).forEach(data_point => {
       
        let dpid = uuidv5(String(data_point.Year) + String(data_point.ISO3), MY_NAMESPACE);
        pool.query("INSERT INTO temperature(dpid, time, country, temperature) \
            VALUES($1, $2, $3, $4)", [dpid, new Date(data_point.Year).toISOString(), data_point.ISO3, data_point.Temperature], function(err) {
                if(err) {
                    console.log(err);
                }
        });
    })
}

function parseRainfall(csv) {
    var csv_no_space = csv.replace("- (MM)", "").replace(/ /g, "");
    var data = $.csv.toObjects(csv_no_space);
    var aggregate_data = {};
    for(var i=0;i<data.length;i++){ // for each obj
        var id = data[i].Year; // get id
        if(aggregate_data.hasOwnProperty(id)){ // if group is already created, add count
            aggregate_data[id].Rainfall += data[i].Rainfall / 12;         
        }else{ // else create group with same values
            aggregate_data[id] = {Rainfall:data[i].Rainfall / 12, Year: data[i].Year, ISO3: data[i].ISO3}
        }
    }

    Object.keys(aggregate_data).forEach((key) => {
        aggregate_data[key].Rainfall = Number(aggregate_data[key].Rainfall.toFixed(5));
    })

    Object.values(aggregate_data).forEach(data_point => {
        let dpid = uuidv5(String(data_point.Year) + String(data_point.ISO3), MY_NAMESPACE);
        pool.query("INSERT INTO rain(dpid, time, country, rainfall) \
            VALUES($1, $2, $3, $4)", [dpid, new Date(data_point.Year).toISOString(), data_point.ISO3, data_point.Rainfall], function(err) {
                if(err) {
                    console.log(err);
                }
        });
    })
}

var directory_path = ["./files/Rain1"]

var i;
for (i = 0; i < directory_path.length; i++) {
    ReadFilesFromDirectory(directory_path[i]);
}