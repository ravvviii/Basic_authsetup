mongoose = require('mongoose')
require('dotenv').config();


// Defining the mongoDB connection URL



// Localhost use karne ke liye
const mongoURL = process.env.LOCAL_DB_URL


// OCloud mongo db url
// const mongoURL = process.env.ONLINE_DB_URL




// setup MongoDB connection

mongoose.connect(mongoURL)


const db = mongoose.connection;


db.on('connected',()=>{
    console.log(`MongoDB server connected ✅`);
    
})
db.on('error',()=>{
    console.log(`MongoDB server connection error ❌`);
    
})
db.on('disconnected',()=>{
    console.log(`MongoDB server disconnected 🔴`);
    
})




// Export database connection

module.exports = db