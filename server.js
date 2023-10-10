const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname,"./public")));
app.use(express.static(path.join(__dirname,"./node_modules"),'models'));
app.get("/",
async (req,res)=>{
    await res.sendFile(path.resolve(__dirname,"./public/index.html"));
})
app.get("/three",
async (req,res)=>{
    await res.sendFile(path.resolve(__dirname,"./node_modules/three/build/three.module.js"));
})
app.get("/three.interaction/src",
async (req,res)=>{
    await res.sendFile(path.resolve(__dirname,"./node_modules/three.interaction/src/"));
})
app.all('*',(req,res)=>{
    res.send("<h1>404 boiii</h1>").status(404);
});

app.listen(8081, "10.138.0.2", ()=>{console.log("Listening at IP 34.83.209.8 port 8081")});