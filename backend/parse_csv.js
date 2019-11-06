var fs = require("fs");
var path = require("path");
var $ = (jQuery = require("jquery"));
const pool = require('./datastore/pgdb');
const uuidv4 = require('uuid/v4');
require("./node_modules/jquery-csv/src/jquery.csv");

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
        if(csv.indexOf("Temperature - Celsius") >= 0) {
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


    Object.values(aggregate_data).forEach(data_point => {
        let dpid = uuidv4();
        let CID = '43c505fb-b51e-4ad4-a735-38e48e2dfb93';
        let source = '89d79ac1-0cd5-4429-9d8c-2ac914eced86';
        let LID = 'c20c3de9-d693-4838-a6f4-3974a8d87194';
        pool.query("INSERT INTO temperature(dpid, cid, temperature, source) \
            VALUES($1, $2, $3, $4)", [dpid, CID, data_point.Temperature, source], function(err) {
                if(err) {
                    console.log(err);
                }
        });
        pool.query("INSERT INTO datapoints(dpid, time, lid) \
            VALUES($1, $2, $3)", [dpid, new Date(data_point.Year).toISOString(), LID], function(err) {
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
        let dpid = uuidv4();
        let CID = '43c505fb-b51e-4ad4-a735-38e48e2dfb93';
        let source = '89d79ac1-0cd5-4429-9d8c-2ac914eced86';
        let LID = 'c20c3de9-d693-4838-a6f4-3974a8d87194';
        pool.query("INSERT INTO rain(dpid, cid, rainfall, source) \
            VALUES($1, $2, $3, $4)", [dpid, CID, data_point.Rainfall, source], function(err) {
                if(err) {
                    console.log(err);
                }
        });
        pool.query("INSERT INTO datapoints(dpid, time, lid) \
            VALUES($1, $2, $3)", [dpid, new Date(data_point.Year).toISOString(), LID], function(err) {
                if(err) {
                    console.log(err);
                }
        });
    })
}

var directory_path = "./files"

ReadFilesFromDirectory(directory_path);


