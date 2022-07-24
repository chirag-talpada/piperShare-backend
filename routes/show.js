const router=require('express').Router();
const fileModel=require("../models/file");

router.get("/:uuid",async(req,res)=>{
    try {
        const file=await fileModel.findOne({uuid:req.params.uuid});
        if(!file) {
            return res.render('download',{error:"Link has been expired!!"});    
        }

        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.size,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`

        });

    } catch(err) {
        return res.render('download',{error:"Something is wrong!!"});
    }
});


module.exports=router;