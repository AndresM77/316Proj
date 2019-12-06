const express = require('express');
const { pool } = require('./config')
const cors = require('cors');


const app = express()
app.use(express.json())    // <==== parse request body as JSON
app.use(cors())


const getDPs = (req, res) => {
    // const category = req.query.category;
    let query = "";
    if(!req.params.category) {
        res.status(400).send("category is required");
    }
    else if(!req.params.year) {
        res.status(400).send("time is required");
    }
    else {
        switch(req.params.category) {
            case "air":
                query = 'SELECT * FROM Air';
                break;
            case "rain":
                query = 'SELECT rainfall, country FROM Rain WHERE Rain.time=$1';
                break;
            case "temp":
                query = 'SELECT temperature, country FROM Temperature WHERE Temperature.time = $1';
                break;
        }

        const year = String(req.params.year) + "-01-01";

        pool.query(query, [year], (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    }
}

const getCategories = (req, res) => {
    let query = "";
    if(!req.params.categories) {
        res.status(400).send("category is required");
    }
    else {
        switch(req.params.categories) {
            case "air":
                query = 'SELECT * FROM Air';
                break;
            case "rain":
                query = 'SELECT rainfall, country FROM Rain';
                break;
            case "temp":
                query = 'SELECT temperature, country FROM Temperature';
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

const getUsers = (req, res) => {
    pool.query('SELECT username FROM Users', (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        res.status(200).json(result.rows);
    })
}

const getCampaign = (req, res) => {
  pool.query('SELECT name, description, goal, paylink FROM Campaign', (err, result) => {
      if (err) {
          res.status(500).send("Internal Server Error")
      }
      res.status(200).json(result.rows);
  })
}

const addCampaign = (req, res) => {
  pool.query(`INSERT INTO Campaign(CID, name, description, goal, paylink) \
              VALUES ('${req.body.CID}', '${req.body.name}', '${req.body.description}', '${req.body.goal}', '${req.body.paylink}')`,
              (err, result) => {
                  if(err) {
                      res.status(500).send(err);
                  }
                  res.status(200).send();
              })
}

const getLikes = (req, res) => {
  if(!req.query.cid) {
      res.status(400).send("CID is required");
  }
  else {
      pool.query(`SELECT username FROM Likes WHERE CID =`+`'`+req.query.cid+`'`, (err, result) => {
          if (err) {
              res.status(500).send("Internal Server Error")
          }
          res.status(200).json(result.rows);
      })
  }
}

const addLikes = (req, res) => {
  pool.query(`INSERT INTO Likes(username, CID) \
              VALUES ('${req.body.username}','${req.body.CID}')`,
              (err, result) => {
                  if(err) {
                      res.status(500).send(err);
                  }
                  res.status(200).send();
              })
}

const getPledges = (req, res) => {
  if(!req.query.cid) {
      res.status(400).send("CID is required");
  }
  else {
      pool.query(`SELECT username, val FROM Pledges WHERE CID =`+`'`+req.query.cid+`'`, (err, result) => {
          if (err) {
              res.status(500).send("Internal Server Error")
          }
          res.status(200).json(result.rows);
      })
  }
}

const addPledges = (req, res) => {
  pool.query(`INSERT INTO Pledges(username, val, CID) \
              VALUES ('${req.body.username}', '${req.body.val}', '${req.body.CID}')`,
              (err, result) => {
                  if(err) {
                      res.status(500).send(err);
                  }
                  res.status(200).send();
              })
}

const getPosts = (req, res) => {
  if(!req.query.cid) {
      res.status(400).send("CID is required");
  }
  else {
      pool.query(`SELECT name, description, time FROM Posts WHERE CID =`+`'`+req.query.cid+`'`, (err, result) => {
          if (err) {
              res.status(500).send("Internal Server Error")
          }
          res.status(200).json(result.rows);
      })
  }
}

const addPosts = (req, res) => {
  pool.query(`INSERT INTO Posts(CID, name, description, time) \
              VALUES ('${req.body.CID}', '${req.body.name}', '${req.body.description}', '${req.body.time}')`,
              (err, result) => {
                  if(err) {
                      res.status(500).send(err);
                  }
                  res.status(200).send();
              })
}

const addUser = (req, res) => {
    pool.query(`INSERT INTO Users (username, password, email, first_name, last_name) \
                values ('${req.body.username}', '${req.body.password}', '${req.body.email}', '${req.body.firstName}', '${req.body.lastName}')`,
                (err, result) => {
                    if(err) {
                        res.status(500).send(err);
                    }
                    res.status(200).send()
                })
}

const checkEmail = (req, res) => {
    pool.query(`SELECT COUNT(*) from Users \
                where email='${req.body.email}'`,
                (err, result) => {
                    if(err) {
                        res.status(500).send(err);
                    }
                    if(result.rows[0].count == 1) {
                        res.status(200).send({ "result": false })
                    } else {
                        res.status(200).send({ "result": true })
                    }
                })
}

const checkUsername = (req, res) => {
    pool.query(`SELECT COUNT(*) from Users \
                where username='${req.body.username}'`,
                (err, result) => {
                    if(err) {
                        res.status(500).send(err);
                    }
                    if(result.rows[0].count == 1) {
                        res.status(200).send({ "result": false })
                    } else {
                        res.status(200).send({ "result": true })
                    }
                })
}

// const getUsers = (req, res) => {
//     pool.query(`SELECT * FROM Users`, (err, result) => {
//         if (err) {
//             res.status(500).send("Internal Server Error")
//         }
//         res.status(200).json(result.rows);
//     })
// }

app.route("/api/v1/:categories").get(getCategories);
app.route('/api/v1/dps/:category/:year').get(getDPs);
app.route("/api/v1/users").get(getUsers);
app.route("/api/v1/users").post(addUser);
app.route("/api/v1/users/validate/email").post(checkEmail);
app.route("/api/v1/users/validate/username").post(checkUsername);
app.route("/api/v1/campaign").get(getCampaign);
app.route("/api/v1/campaign").post(addCampaign);
app.route("/api/v1/likes").get(getLikes);
app.route("/api/v1/likes").post(addLikes);
app.route("/api/v1/pledges").get(getPledges);
app.route("/api/v1/pledges").post(addPledges);
app.route("/api/v1/posts").get(getPosts);
app.route("/api/v1/posts").post(addPosts);

app.listen(process.env.PORT || 3002, () => {
    console.log('Server listening')
  })


// const getDepDPs = (req, res) => {
//     // const category = req.query.category;
//     let query = "";

//     if(!req.query.category) {
//         res.status(400).send("category is required");
//     }
//     else if(!req.query.time) {
//         res.status(400).send("time is required");
//     }
//     else {
//         switch(req.query.category) {
//             case "air":
//                 query = `SELECT * FROM Air WHERE Air.time=`+`'`+req.query.time+`'`;
//                 break;
//             case "rain":
//                 query = `SELECT * FROM Rain WHERE Rain.time=`+`'`+req.query.time+`'`;
//                 break;
//             case "temp":
//                 query = `SELECT * FROM Temperature WHERE Temperature.time=`+`'`+req.query.time+`'`;
//                 break;
//         }

//         pool.query(query, (err, result) => {
//             if (err) {
//                 res.status(500).send("Internal Server Error")
//             }
//             res.status(200).json(result.rows);
//         })
//     }
// }
