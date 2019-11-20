const express = require('express');
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
                query = 'SELECT * FROM Air';
                break;
            case "rain":
                query = 'SELECT rainfall, lat, lng FROM Rain WHERE Rain.DPID=DataPoints.DPID';
                break;
            case "temp":
                query = 'SELECT temperature, country FROM Temperature WHERE Temperature.time = $1';
                break;
        }

        pool.query(query, [req.time+'-01-01'], (err, result) => {
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
                query = `SELECT * FROM Air WHERE Air.time=`+`'`+req.query.time+`'`;
                break;
            case "rain":
                query = `SELECT * FROM Rain WHERE Rain.time=`+`'`+req.query.time+`'`;
                break;
            case "temp":
                query = `SELECT * FROM Temperature WHERE Temperature.time=`+`'`+req.query.time+`'`;
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
app.route('/api/v1/dps/:category/:time').get(getDPs);
app.route("/api/v1/depdps").get(getDepDPs);
app.route("/api/v1/nonprofits").get(getNonprofits);
app.route("/api/v1/nonprofits/categories").get(getNonprofitCategories);
app.route("/api/v1/users").get(getUsers);

app.listen(process.env.PORT || 3002, () => {
    console.log('Server listening')
  })
