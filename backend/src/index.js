const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 8080;
const dbConnect = require('./config/db')
const {DataRouter,UserRouter} = require('./routes/index.js');
const app = express()
require('dotenv').config();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/data',DataRouter);
app.use('/user',UserRouter);
app.get('/', (req, res) => res.send('hello'))

dbConnect().then(()=>{  
    app.listen(port, () => {console.log('server started on port 8080')})
})