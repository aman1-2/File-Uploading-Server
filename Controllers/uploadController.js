const File = require('../Models/file');

//LocalFileUpload -> Handler Function.
exports.localFileUpload = async(req,res) => {
    try{
        //Fetch the file from the request.
        const {name,tag,email} = req.body;
        const file = req.files.file; //We are using .file to fetch the data because we have given the name file in the request data.
        console.log("File Data -> ",file);

        //Defining the path where we need to save the file in the server.
        let path = __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`; //Server's path.
        /*Inside path Date.now() is used to indicate the name of the file.
        And this is -> `.${file.name.split('.')[1]}` for defining the extension of the file.*/

        //Now i need to move this file to my destination which is path.
        file.mv(path , (error) => {
            console.log(error);
        }); 

        //Storing data into the database.
        const dataFile = File.create({name,tag,email});
        
        res.status(200).json({
            success:true,
            message:"File has been successfully uploaded to the local server."
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"There is Error while uploading the file.",
            data:error
        })

        console.log(error);
    }
}