const express = require('express'); //Extracted in out.
const dbConnect = require('./Config/database'); //Importing the DbConnect function.
const fileUpload = require('express-fileupload'); //Require the express-fileupload library
const cloudinaryConnect = require('./Config/cloudinary'); //Importing the cloudinaryConnect function.

const app = express(); //Creates an instance of the express.

//Adding middlewares.
app.use(express.json()); //For parsing json data.
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})); //For storing the files in the server and its information in the database.

//Loading .env file into process.
require('dotenv').config();
const port = process.env.PORT;

//Connections
dbConnect(); //Makes a connection with the db.
cloudinaryConnect(); //Makes a connection with the cloudinary.

//Default Route.
app.get('/',(req,res)=>{
    res.send("<div>Jai Shree Ram!!<br/>Har Har Mahadev<br/>Radhe Radhe...</div>");
});

//Routes
const upload = require('./Routes/fileUpload');
app.use("/api/v1",upload);

//Launching the server
app.listen(port,()=>{
    console.log("The server has been established Successfully.");
})