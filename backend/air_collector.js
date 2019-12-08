const fetch = require('node-fetch');
const pool = require('./datastore/pgdb');
const uuidv5 = require('uuid/v5');
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
pool.connect(function(err){
    console.log("connected")
    if(err)
    {
        console.log(err);
    }
});
async function getMarker() {
    let response = await fetch(`https://waqi.info/rtdata/`)
    let data = await response.json();
    return data.path;
}
async function getData() {
    let marker = await getMarker()
    let response = await fetch(`https://waqi.info/rtdata/${marker}/level1.json`);
    let data = await response.json();
    data.forEach(e => {
        let lat =  e.g[0];
        let long = e.g[1];
        let value = parseFloat(e.a);
        if(isNaN(value)) return;
        let dpid = uuidv5(String(lat)+String(long), MY_NAMESPACE);
        pool.query(`UPDATE Air \
                    SET dpid = $1, lat = $2, lng = $3, countryid = 'XXX', quality = $4 \
                    WHERE lat = $2 AND lng = $3`, [dpid, lat, long, value], (err) => {
                        if(err) {
                            console.log(err);
                        }
                    }
        )       
        console.log(e);
    });
}
getData()

