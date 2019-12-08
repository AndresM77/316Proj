const express = require('express');
const https = require('https');
const fs = require('fs');
const { pool } = require('./config')
const cors = require('cors');


const app = express()
app.use(express.json())    // <==== parse request body as JSON
app.use(cors())


const getDPs = (req, res) => {
    // const category = req.query.category;
    try {
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
                    query = 'SELECT rainfall, countryID FROM Rain WHERE Rain.time=$1';
                    break;
                case "temp":
                    query = 'SELECT temperature, countryID FROM Temperature WHERE Temperature.time = $1';
                    break;
            }

            const year = String(req.params.year) + "-01-01";

            if(req.params.category == "air") {
                pool.query(query, (err, result) => {
                    if (err) {
                        res.status(500).send("Internal Server Error")
                    }
                    res.status(200).json(result.rows);
                })
            } else {
                pool.query(query, [year], (err, result) => {
                    if (err) {
                        res.status(500).send("Internal Server Error")
                    }
                    res.status(200).json(result.rows);
                })
            }
        }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const getCategories = (req, res) => {
    try {
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
                    query = 'SELECT rainfall, countryID FROM Rain';
                    break;
                case "temp":
                    query = 'SELECT temperature, countryID FROM Temperature';
                    break;
            }

            pool.query(query, (err, result) => {
                if (err) {
                    res.status(500).send("Internal Server Error")
                }
                res.status(200).json(result.rows);
            })
        }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const getUsers = (req, res) => {
    try {
        pool.query('SELECT username FROM Users', (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const getCampaign = (req, res) => {
    try {
        pool.query('SELECT * FROM Campaign', (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const addCampaign = (req, res) => {
    try {
        if(!req.body.CID) {
            res.status(400).send("CID is required");
        }
        else if(!req.body.name) {
            res.status(400).send("name is required");
        }
        else if(!req.body.description) {
            res.status(400).send("description is required");
        }
        else if(!req.body.paylink) {
            res.status(400).send("paylink is required");
        }
        else {
            pool.query(`INSERT INTO Campaign(CID, name, description, paylink, creator) \
                        VALUES ('${req.body.CID}', '${req.body.name}', '${req.body.description}', '${req.body.paylink}', '${req.body.creator}')`,
                        (err, result) => {
                            if(err) {
                                res.status(500).send(err);
                            }
                            res.status(200).send();
                        })
        }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

<<<<<<< HEAD
const getLikes = (req, res) => {
    try {
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
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
=======
const getCampaign = (req, res) => {
    pool.query('SELECT CID, name, description, goal, paylink FROM Campaign', (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        res.status(200).json(result.rows);
    })
>>>>>>> Updated Index.js
}

const getUserLikes = (req, res) => {
    try{
        if(!req.query.username) {
            res.status(400).send("username is required");
        }
        else {
            pool.query(`SELECT CID FROM Likes WHERE username = `+`'`+req.query.username+`'`, (err, result) => {
                if(err) {
                    res.status(500).send("Internal Server Error")
                }
                res.status(200).json(result.rows);
            })
        }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const getUserLikes = (req, res) => {
    if(!req.query.username) {
        res.status(400).send("username is required");
    }
    else {
        pool.query(`SELECT CID FROM Likes WHERE username = `+`'`+req.query.username+`'`, (err, result) => {
            if(err) {
                res.status(500).send("Internal Server Error")
            }
            res.status(200).json(result.rows);
        })
    }
}

const addLikes = (req, res) => {
    try {
        if(!req.body.cid) {
            res.status(400).send("CID is required");
        }
        if(!req.body.username) {
            res.status(400).send("Username is required");
        }
        pool.query(`INSERT INTO Likes(username, CID) \
            VALUES ('${req.body.username}','${req.body.CID}')`,
            (err, result) => {
                if(err) {
                    res.status(500).send(err);
                }
                res.status(200).send();
            }
        )
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const removeLikes = (req, res) => {
    try{
        if(!req.body.username) {
            res.status(400).send("username is required");
        }
        if(!req.body.CID) {
            res.status(400).send("CID required");
        }
        else {
            pool.query(`DELETE FROM Likes WHERE username = `+`'`+req.body.username+`'` + `and CID = `+`'`+req.body.CID+`'`, (err, result) => {
                if(err) {
                    res.status(500).send("Internal Server Error")
                }
                res.status(200).send();
            })
        } 
    } catch(error) {
        res.status(500).send("Internal Server Error");
    }
    
}

const getPledges = (req, res) => {
    try {
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
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const addPledges = (req, res) => {
    try {
        if(!req.query.username) {
            res.status(400).send("username is required");
        }
        else if(!req.query.val) {
            res.status(400).send("val is required");
        }
        else if(!req.query.CID) {
            res.status(400).send("CID is required");
        }
        else {
        pool.query(`INSERT INTO Pledges(username, val, CID) \
                VALUES ('${req.body.username}', '${req.body.val}', '${req.body.CID}')`,
                (err, result) => {
                    if(err) {
                        res.status(500).send(err);
                    }
                    res.status(200).send();
                })
        }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const getPosts = (req, res) => {
    try {
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
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const addPosts = (req, res) => {
    try {
        if(!req.body.CID) {
            res.status(400).send("password is required");
        }
        else if(!req.body.name) {
            res.status(400).send("email is required");
        }
        else if(!req.body.description) {
            res.status(400).send("description is required");
        }
        else if(!req.body.time) {
            res.status(400).send("time is required");
        }

        else {
            pool.query(`INSERT INTO Posts(CID, name, description, time) \
                VALUES ('${req.body.CID}', '${req.body.name}', '${req.body.description}', '${req.body.time}')`,
                (err, result) => {
                    if(err) {
                        res.status(500).send(err);
                    }
                    res.status(200).send();
                })
            }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const addUser = (req, res) => {
    try {
        if(!req.body.username) {
            res.status(400).send("username is required");
        }
        else if(!req.body.password) {
            res.status(400).send("password is required");
        }
        else if(!req.body.email) {
            res.status(400).send("email is required");
        }
        else if(!req.body.firstName) {
            res.status(400).send("firstName is required");
        }
        else if(!req.body.lastName) {
            res.status(400).send("lastName is required");
        }
        else {
            pool.query(`SELECT COUNT(*) from users where username='${req.body.username.toLowerCase()}'`,
                        (err, result) => {
                            if(err) {
                                res.status(500).send(err);
                            }
                            if(result.rows[0].count >= 1) {
                                res.status(200).send({ "result": false })
                            }
            })

            pool.query(`INSERT INTO Users (username, password, email, first_name, last_name) \
                    values ('${req.body.username.toLowerCase()}', '${req.body.password}', '${req.body.email.toLowerCase()}', '${req.body.firstName}', '${req.body.lastName}')`,
                    (err, result) => {
                        if(err) {
                            res.status(500).send(err);
                        }
                        res.status(200).send({ "result": true })
                    })
            }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const checkEmail = (req, res) => {
    try {
        if(!req.body.email) {
            res.status(400).send("email is required");
        }
        else {
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
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const checkUsername = (req, res) => {
    try {
        if(!req.body.username) {
            res.status(400).send("username is required");
        }
        else {
            pool.query(`SELECT COUNT(*) from users where username='${req.body.username.toLowerCase()}'`,
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
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
}

const checkLogin = (req, res) => {
    try {
        if(!req.body.username) {
            res.status(400).send("username is required");
        }
        else if(!req.body.password) {
            res.status(400).send("password is required");
        }
        else {
            pool.query(`SELECT COUNT(*) from users where username='${req.body.username.toLowerCase()}' and password='${req.body.password}'`,
                        (err, result) => {
                            if(err) {
                                res.status(500).send(err);
                            }
                            if(result.rows[0].count == 1) {
                                res.status(200).send({ "result": true })
                            } else {
                                res.status(200).send({ "result": false })
                            }
                        })
            }
    } catch(error) {
        res.status(500).send("Internal Server Error")
    }
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
app.route('/api/v1/dps/:category/:year').get(getCampaign);
app.route("/api/v1/users").get(getUsers);
app.route("/api/v1/users").post(addUser);
app.route("/api/v1/users/login").post(checkLogin);
app.route("/api/v1/users/validate/email").post(checkEmail);
app.route("/api/v1/users/validate/username").post(checkUsername);
app.route("/api/v1/campaign/:get").get(getCampaign);
app.route("/api/v1/campaign").post(addCampaign);
app.route("/api/v1/likes/get").get(getLikes);
app.route("/api/v1/likes").post(addLikes);
app.route("/api/v1/pledges").get(getPledges);
app.route("/api/v1/pledges").post(addPledges);
app.route("/api/v1/posts").get(getPosts);
app.route("/api/v1/posts").post(addPosts);
app.route("/api/v1/likes/user").get(getUserLikes);
app.route("/api/v1/likes/remove").post(removeLikes);

<<<<<<< HEAD
// app.listen(process.env.PORT || 3002, () => {
//     console.log('Server listening')
//   })

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/frank.colab.duke.edu/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/frank.colab.duke.edu/fullchain.pem'),
    passphrase: ''
}, app).listen(process.env.PORT || 3002, () => {
=======
app.listen(process.env.PORT || 443, () => {
>>>>>>> Updated Index.js
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
