const express = require("express");
const cors = require("cors")
const sqlite3 = require("sqlite3");
const {open} = require("sqlite");
const path = require("path");
const app = express();


app.use(cors());
const dbPath = path.join(__dirname, "wondersdata.db");
let db = null;
const initializeDbAndServer = async() =>{
    try{
    db = await open({
        filename:dbPath,
        driver:sqlite3.Database
    });
    app.listen(3005, () =>{
        console.log("Server Running at http://localhost:3005/")
    });
   }catch(error){
    console.log(`DB Error: ${error.message}`)
    process.exit(1);
}
}

initializeDbAndServer()


app.get("/wonders/", async (request,response) => {
    const getWondersQuery = `
    select
    *
    from 
    wonders
    order by
    id`;

    const wondersArray = await db.all(getWondersQuery);
    response.send(wondersArray);
})


app.get("/wonders/:id", async (request,response) => {
    const {id} = request.params;

    const getWondersQuery  = `
    select
    *
    from 
    wonders
    where
    id = ${id}`;
    const wonder = await db.get(getWondersQuery);
    response.send(wonder)
})
