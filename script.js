const fileModel=require('./models/file');
const fs=require('fs');

//mongodb connection
const con=require("./config/db");

con.then(db=>{
    if(!db) return process.exit(1);

    fetchDate().then(process.exit());

}).catch(error=>{
    console.log(`Connection Failed...! ${error}`);
});



async function fetchDate() {
    const pastDate=new Date(Date.now()-24*60*60*1000);
    const files=await fileModel.find({createdAt:{$lt:pastDate}});

    if(files.length) {
        for(const file of files) {
           try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfully deleted ${file.filename}`);
           } catch(err) {
            console.log(`Error while deleting files ${err}`);
           }
        }
    }

    console.log('job done');

}