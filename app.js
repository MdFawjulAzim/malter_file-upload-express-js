import express from 'express';
import cors from 'cors';
import upload from './src/middleware/fileUpload.js';

const app = express();
app.use(cors());
app.use(express.json({limit:"100mb"}));

// Multiple file upload
app.post('/uploads',upload.array("file",100),(req,res)=>{
    try{
        if(!req.files){
            return res.status(400).json({message:"No files uploaded"});
        }
        res.status(200).json({message:"Files uploaded successfully", files:req.files});
    }catch(e){
        res.status(500).json({error:e.message});
    }

})
// single file upload
app.post('/uploadsingle', upload.single('file'), (req, res) => {
    try {        
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.status(200).json({ message: "File uploaded successfully", file: req.file });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use("/get-upload-file", express.static("uploads") )

export default app;

