const express = require('express');
const app = express();


app.listen(3000, ()=>{
    console.log("listening on port 3000...");
})
app.get("/", (req,res)=>{
    res.send("Hi There!");
})
app.get("/api",(req,res)=>{
    res.send([1,2,3,4,5,6])
});
