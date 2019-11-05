var fs = require("fs");
var path = require("path");
var $ = (jQuery = require("jquery"));
require("./node_modules/jquery-csv/src/jquery.csv");

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
}

var directory_path = "./files"

ReadFilesFromDirectory(directory_path);


