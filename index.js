const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const Connect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log(`DB Connected Successfully`)
    } catch (error) {
        console.error('Db connection failed');
    }
    
}
Connect()



const Port = process.env.PORT || 8080
app.listen(Port, ()=>{
    console.log(`Server runing on port ${Port}`)
})