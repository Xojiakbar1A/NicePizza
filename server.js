const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const dotenv = require('dotenv');
const  mongoose  = require('mongoose');
const cloudinary = require('cloudinary');
const socketIo = require('socket.io')
const fs = require('fs');
const http = require("http");
const path = require('path');


dotenv.config();
const app = express();

const PORT = process.env.PORT || 4003;

//cloudindry seting
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

//router ulash

const userRouter = require('./src/router/userRouter')
const foodRouter = require('./src/router/foodRouter')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({useTempFiles: true}))
app.use(cors())



app.get('/', (req, res ) => {
    res.send("Home")
    
})
//router ishlatish
app.use('/user',userRouter);
app.use('/food',foodRouter);


const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {}).then(() => {
    app.listen(PORT , console.log(`Server started in ${PORT} PORT `));
}).catch(err => {
    console.log(err);
})

