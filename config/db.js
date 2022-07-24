require('dotenv').config();
const mongoose=require('mongoose');


const conn=mongoose.connect(process.env.DB_URI)
    .then(res=>{
        console.log("Database Successfully Connected!");
        return res;
    }).catch(err=>{
        console.log(err);
});

module.exports=conn;