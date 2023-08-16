const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname,"./public")));

app.get("/",
async (req,res)=>{
    await res.sendFile(path.resolve(__dirname,"./public/index.html"))
})

app.all('*',(req,res)=>{
    res.send("<h1>404 boiii</h1>").status(404);
});

app.listen(80, "10.138.0.2", ()=>{console.log("Listening at IP 34.83.209.8 port 80")});