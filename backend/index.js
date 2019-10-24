const express = require('express');
const { pool } = require('./config')

const app = express()

const getCategories = (req, res) => {
    pool.query('SELECT * FROM Categories', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows);
    })
}

app.route("/categories").get(getCategories);


app.listen(process.env.PORT || 3002, () => {
    console.log('Server listening')
  })