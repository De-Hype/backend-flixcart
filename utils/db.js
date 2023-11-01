const mongoose = require('mongoose');
require('dotenv').config();


const Connect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log(`DB Connected Successfully`)
    } catch (error) {
        console.error('Db connection failed');
    }
    
}
module.exports = { Connect }