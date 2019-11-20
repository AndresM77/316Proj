const express` = require('express');
const { pool } = require('./config')

const app = express()

const getDPs = (req, res) => {
    // const category = req.query.category;
    console.log(res)
    let query = "";
    if(!req.params.category) {
        res.status(400).send("category is required");
    }
    else {
        switch(req.params.category) {
            case "air": 
                query = 'SELECT quality, lat, lng FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID';
                break;
            case "rain":
                query = 'SELECT rainfall, lat, lng FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID';
                break;
            case "temp":
                query = 'SELECT * FROM temperature';
                break;
        }

        pool.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    }
}

const getCategories = (req, res) => {
    pool.query('SELECT * FROM CATEGORIES', (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        res.status(200).json(result.rows);
    })
}

const getDepDPs = (req, res) => {
    // const category = req.query.category;
    let query = "";

    if(!req.query.category) {
        res.status(400).send("category is required");
    }
    else if(!req.query.time) {
        res.status(400).send("time is required");
    }
    else {
        switch(req.query.category) {
            case "air": 
                query = `SELECT quality, lat, lng FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID AND DataPoints.time=`+`'`+req.query.time+`'`;
                break;
            case "rain":
                query = `SELECT quality, lat, lng FROM Rain, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID AND DataPoints.time=`+`'`+req.query.time+`'`;
                break;
            case "temp":
                query = `SELECT quality, lat, lng FROM Temperature, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID AND DataPoints.time=`+`'`+req.query.time+`'`;
                break;
        }

        pool.query(query, (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    }
}

const getNonprofits = (req, res) => {
    pool.query('SELECT name, description FROM Nonprofits', (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        res.status(200).json(result.rows);
    })
}

const getNonprofitCategories = (req, res) => {
    if(!req.query.cid) {
        res.status(400).send("CID is required");
    }
    else {
        pool.query(`SELECT name, description FROM Nonprofits WHERE CID =`+`'`+req.query.cid+`'`, (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    }
}

const getUsers = (req, res) => {
    pool.query('SELECT username FROM Users', (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        res.status(200).json(result.rows);
    })
}

app.route("/api/v1/categories").get(getCategories);
app.route('/api/v1/dps/:category').get(getDPs);
app.route("/api/v1/depdps").get(getDepDPs);
app.route("/api/v1/nonprofits").get(getNonprofits);
app.route("/api/v1/nonprofits/categories").get(getNonprofitCategories);
app.route("/api/v1/users").get(getUsers);

app.listen(process.env.PORT || 3002, () => {
    console.log('Server listening')
  })
