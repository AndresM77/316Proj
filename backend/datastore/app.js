var fs = require('fs');
var csv = require('fast-csv');
const pool = require('./pgdb');
const uuidv4 = require('uuid/v4');

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});

let counter = 0; 

// let header = [];
// let data = [];

const country = "USA"

pool
    .query(`SELECT * from locations WHERE country=$1`, [country])
    .then(res => {
        console.log(res.rows[0].lid);
        let lid = res.rows[0].lid;
        readFile(lid);
    })
    .catch( err =>
        console.log(err)
    )

function readFile(lid) {
    let csvStream = csv.fromPath('./test_USA.csv', { headers: true })
    .on("data", function(record){
        csvStream.pause();

        //only get the first 100 rows for experimental purpose, can extend to whole file
        if(counter < 100)
        {
            let temp = record.Temperature;
            let year = record.Year;
            // let country = record.Country;
            // let year = record.Year;
            // let iso = record.ISO3;
            let dpid = uuidv4();
            let CID = '43c505fb-b51e-4ad4-a735-38e48e2dfb93';
            let source = '89d79ac1-0cd5-4429-9d8c-2ac914eced86';
            
            //--------Load data into PSQL database--------

            pool.query("INSERT INTO datapoints(dpid, time, lid) \
            VALUES($1, $2, $3)", [dpid, new Date(year), lid], function(err) {
                if(err) {
                    console.log(err);
                }
            });

            pool.query("INSERT INTO temperature(dpid, cid, temperature, source) \
            VALUES($1, $2, $3, $4)", [dpid, CID, temp, source], function(err) {
                if(err) {
                    console.log(err);
                }
            });


            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });
};




// var fs = require('fs');
// var csv = require('fast-csv');
// const pool = require('./pgdb');

// pool.connect(function(err) {
//     if (err) {
//         console.log(err);
//     }
// });

// let counter = 0;  //don't want to read all lines

// //let header = [];

// //let data = [];

// let csvStream = csv.fromPath("test_USA.csv", { headers: true })  // "\\" to escape one \
//     .on("data", function(record) {
//         console.log("starting");
//         csvStream.Pause();

//         if (counter < 10) {
//             let temp = record.Temperature-Celsius;
//             let country = record.Country;
//             let year = record.Year;
//             let iso = record.ISO3;

//             pool.query("INSERT INTO Air(DPID, CID, quality, source) \
//             VALUES($1, $2, $3, $4)", [counter, temp, country, year, iso], function(err) {
//                 if(err) {
//                     console.log(err);
//                 }
//             });
//             ++counter;
//         }

//         csvStream.Resume();
//     }).on("end",function() {
//         console.log("Job done!");
//     }).on("error", function(err) {
//         console.log(err);
//     });




