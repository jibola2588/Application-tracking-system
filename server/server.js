const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectionSring = 'mongodb+srv://sugutlynn:sugutlynn@cluster0.yjsqky7.mongodb.net/ats_db';

 async function connect() {
    try {
        await mongoose.connect(connectionSring, {
            autoIndex: true
        })
        console.log('DATABASE CONNECTION SUCCESSFUL');
        
    } catch (error) {
        console.error(error);
        
    }
}

connect();

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
