'use strict';
console.out = (str) => console.log(`${Date.now()} : ${str}`)

const express   = require("express");
const bodyParser= require("body-parser");
const cors      = require("cors");
const app       = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT,(err=>{
    if(!err)    console.out(`Server ${process.env.SERVER_NAME} running on port ${process.env.PORT}`)
    else        console.error(err);
}))

app.get('/',(req,res)=>{
    res.end("Hello .......")
})

app.post("/metrics",(req,res)=>{
    res.status(200).send({})
})