const express = require('express');
const bodyParser = require('body-parser')
const db = require('./queries')

// Set up the express app
const app = express();
const port = 3002;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
   response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/v1/temp', db.getTemp)
app.get('/v1/users/:id', db.getUserById)
app.post('/v1/users', db.createUser)
app.put('/v1/users/:id', db.updateUser)
app.delete('/v1/users/:id', db.deleteUser)

app.listen(port, () => {
   console.log(`App running on port ${port}.`)
})


//  // Log requests to the console.
// app.use(logger('dev'));

//  // Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false  }));

//  // Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//    message: 'Welcome to the beginning of nothingness.',
// }));

module.exports = app;
