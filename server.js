require('dotenv').config();
const express=require('express');
const path=require('path');
const app=express();

const cors = require('cors');
// Cors 
const corsOptions = {
  origin: "*"
}

const PORT=process.env.PORT || 5000;

app.use(cors(corsOptions))
app.use(express.static('public'));
app.use(express.json());


//template engine
app.set("views",path.join(__dirname,'/views'))
app.set('view engine','ejs');



//mongodb connection
const con=require("./config/db");

con.then(db=>{
    if(!db) return process.exit(1);
    
    app.listen(PORT,()=>{
        console.log("Server is running on",PORT,"Port number");
    });

    app.on("error",err=>`Failed To Connect with HTTP Server: ${err}`);

}).catch(error=>{
    console.log(`Connection Failed...! ${error}`);
});


//routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.get("/msg",(req,res)=>{
    res.send("done");
});

