var fs = require("fs");
var $ = (jQuery = require("jquery"));
require("./node_modules/jquery-csv/src/jquery.csv");

var file_1 = "./test_USA.csv";
var file_2 = "./test_URUGUAY.csv";


function ReadFile(file) {
    fs.readFile(file, "UTF-8", function(err, csv) {
        if(err) {
            console.log(err);
        }
        if(csv.indexOf("Temperature - Celsius") >= 0) {
            parseTemperature(csv);
        } else if (csv.indexOf("Rainfall - (MM)") >= 0) {
            parseRainfall(csv);
        }
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

ReadFile(file_1);
ReadFile(file_2);
