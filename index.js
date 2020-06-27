const express = require('express')
const app = express()

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');//require to read file
const config = require('./config/config');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

const authRoutes = require('./routes/auth');
const managerRoutes= require('./routes/manager');
const employeeRoutes= require('./routes/employee');

app.use('/', authRoutes);
app.use('/', managerRoutes);
app.use('/', employeeRoutes);

// returning all api list
app.get('/', (req, res) => {
    fs.readFile('docs/apidocs.json', (err, data) => {
        if (err) return res.status(400).json({ error: err })
        const docs = JSON.parse(data)
        res.json(docs);
    })
})

app.use(function (err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized' });
    }
})

mongoose.Promise = global.Promise;


const port = 3001;

// connecting database
mongoose.connect(config.mongo.url, { useNewUrlParser: true }).then(() => {
    console.log("connected to EmployeeManagement database");
}).catch(err => {
    // mongoose connection error will be handled here
    console.error('App starting error:', err.stack);
    process.exit(1);
});

app.listen(port, () => console.log(`Listning on port ${port}`));