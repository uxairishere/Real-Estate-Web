require('dotenv').config();
const express = require("express");
const app = express()
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const path = require('path');
const EmailRouter = require('./routes/email.router')

const satlRounds = 10

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: "data",
    secret: "youmustbetheclient",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60,
    }
}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'realestate',
});

app.use(express.static('public'))

// routers 
app.use('/', EmailRouter);

app.get('/testing', (req,res) => {
    res.send("<img src='/logo.png' />")
})

//user registration
app.post('/signup', (req, res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const number = req.body.number
    const address = req.body.address
    db.query("SELECT * FROM users WHERE email=?",
        email,
        (err, data) => {
            if (err) {
                res.send({ error: err })
            }
            if (data.length > 0) {
                res.send({ message: "User already exists" })
            } else {
                bcrypt.hash(password, satlRounds, (err, hash) => {
                    if (err) {
                        console.log(err)
                    } else {
                        db.query("INSERT INTO users (firstname,lastname,number,address,email,password) VALUES (?,?,?,?,?,?)",
                            [firstname, lastname, number, address, email, hash],
                            (err, result) => {
                                if (err) {
                                    console.log("err")
                                } else {
                                    return res.json({ result: "status okay" })
                                }
                            })
                    }
                })
            }
        })
})



//user login
app.post('/signin', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email=? ",
        email,
        (err, result) => {
            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        res.json({ result: result[0] })
                    } else {
                        res.json({ message: "Incorrect Password" })
                    }
                })
            }
            else {
                res.json({ message: "User Does not exist" })
            }
        })
})


//adding post and bolg
const imageStorage = multer.diskStorage({
    destination: `${__dirname}/../client/public/images/`, // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});


const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000   // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {    
            return cb(new Error('Please upload an Image'))
        }
        cb(undefined, true)
    }
})


app.post('/uploadmulterimages', imageUpload.array("files"), async (req, res) => {
    try {
        let filesArray = [];
        req.files.forEach(element => {

            filesArray.push(element.filename);
        });
        res.send(filesArray)
    } catch (err) {
        console.error(err);
    }
});


app.post('/addpost', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const location = req.body.location
    const demand = req.body.demand
    const type = req.body.type
    const purpose = req.body.purpose
    const area = req.body.area
    const pics = req.body.pics
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const number = req.body.number
    const email = req.body.email
    db.query("INSERT INTO posts (title,description,location,demand,type,purpose,area,pics,firstname,lastname,number,email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [title, description, location, demand, type, purpose, area, pics, firstname, lastname, number, email],
        (err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.send(result)
            }
        })
})


app.post('/addblog', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const pics = req.body.pics
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    db.query("INSERT INTO blogs (title,description,pic,firstname,lastname) VALUES (?,?,?,?,?)",
        [title, description, pics, firstname, lastname],
        (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
})


//get posts and blogs
app.get('/getposts', (req, res) => {
    db.query("SELECT * FROM posts",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
})


app.post('/getsinglepost', (req, res) => {
    const id = req.body.postId
    db.query("SELECT * FROM posts WHERE idposts=? ",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
})

app.post('/deletepost', (req, res) => {
    const id = req.body.postId
    db.query("DELETE FROM posts WHERE idposts=? ",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
})


app.get('/getblogs', (req, res) => {
    db.query("SELECT * FROM blogs",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
})


app.post('/getsingleblog', (req, res) => {
    const id = req.body.blogId
    db.query("SELECT * FROM blogs WHERE  idblogs=?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
})


app.get('/getproperties', (req, res) => {
    const id = req.body.blogId
    db.query("SELECT * FROM properties",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
})

app.listen(3001, () => {
    console.log("server running on port 3001")
})