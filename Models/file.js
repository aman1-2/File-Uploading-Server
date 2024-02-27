//For creating a schema or a module we need to import the mongoose instance.
const mongoose = require('mongoose');

const nodemailer = require('nodemailer'); //This instance is being created for mailing servers

require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    imageUrl : {
        type : String,
        require : true
    },
    tag : {
        type:String
    },
    email : {
        type:String
    }
});

/*Creating a Post MiddleWare.
This is for sending a mail once a Successful entry has been made from the server to the
database.
Syntax - name-of-schema.post("On-what-type",function(doc){}) the doc -> arugument here shows
model details.
Save here indicates -> the opeartion or the method on which i want to apply this operation.It is
an async function because we are making a interaction with the database.*/

fileSchema.post("save",async function(doc){
    try{
        //Creating a Transporter function.
        let transporter = nodemailer.createTransport({
            port: 465,
            secure : true,
            debug : true,
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASSWORD
            }
        });

        //Send the mail to the respective person.
        let info = await transporter.sendMail({
            from : `BY - Aman pratap Singh`,
            to : doc.email,
            subject : "New File Uploded on the Server Message.",
            html : `<h2>Jai Shree Ram</h2><br></br><p>You have Successfully made your upload on the server.<br></br>Can click the link below to see the picture.<br></br><a href ="${doc.imageUrl}">"${doc.imageUrl}"</a></p><br></br>Thank you From Aman Pratap Singh.`
        });

        console.log(info);
    }
    catch(error){
        console.log("This Error has arrived during the mail sending.");
        console.log(error);
    }
})

module.exports = mongoose.model("File",fileSchema);