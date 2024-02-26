const File = require('../Models/file');
const cloudinary = require('cloudinary').v2;

function isFileSupported(fileType, supportedType){
    /*Inside this function we are checking if the file type is supported or not if it is
    supported we have returned a true value and if its not returned a false value.
    Here inside this function we have passed the type of the file and an array of the 
    supported type for that file. */
    if(supportedType.includes(fileType))
        return true;
    else
        return false;

}

/*Since we will be needing this function to upload the file therefore we have made universally.
Made it async because we are going to upload a file.
You have provided the data which file and at what or where you have to upload that file.*/
async function fileUploadCloudinary(file, folder){
    const options = {folder};
    options.resource_type = "auto"; //Mostly required for the case of video Upload and it will detect the type of file automatically.
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

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

//imageUpload -> Handler Function.
exports.imageUpload = async (req,res) => {
    //Step 1 -> Is to create a folder in the cloudinary from the media Explore or media Library Option.
    try{
        //Step 2 -> Fetching all the data from the request body.
        const {name,tag,email} = req.body;
        const file = req.files.imageFile; //This will extract the file from the request body.

        //Step 3 -> Data validation.That will check that which type of image can be supported.
        const supportedType = ["jpeg", "jpg", "png"]; //The values present in the array is only supported for my file to be uploded on the cloudinary server.
        const fileType = file.name.split('.')[1].toLowerCase(); /*This will extract the file extension
        from the file you have send from its name attribute and will at last convert the data into lower case for the shake of the safety.*/

        if(!isFileSupported(fileType, supportedType)){
            res.status(400).json({
                success : false,
                message : "Error while validating the file during the time of File upload at the cloudinary."
            });
        }

        //Step 4 -> Upload this to the Cloudinary Database.If this file is of supported type.
        const response = await fileUploadCloudinary(file, "FileUploadDataBase");

        //Step 5 -> Is to create an entry in the database.
        const fileData = File.create({name,
            tag,
            email,
            imageUrl:response.secure_url
        });

        //Last step is if a successful entry is made then make a Success Response.
        res.status(200).json({
            success : true,
            message : "Image File has been successfully uploaded to the Cloudinary.",
            imageUrl: response.secure_url
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error while the image Upload Might be not able to Extract file."
        });
    }

}

//videoUpload -> Handler Function.
exports.videoUpload = async (req,res) => {
    //Step 1 -> Is to create a folder in the cloudinary from the media Explore or media Library Option.
    try{
        //Step 2 -> Fetching all the data from the request body.
        const {name,tag,email} = req.body;
        const file = req.files.videoFile; //This will extract the file from the request body.

        //Step 3 -> Data validation.That will check that which type of image can be supported.
        const supportedType = ["mp4", "mov"]; //The values present in the array is only supported for my file to be uploded on the cloudinary server.
        const fileType = file.name.split('.')[1].toLowerCase(); /*This will extract the file extension
        from the file you have send from its name attribute and will at last convert the data into lower case for the shake of the safety.*/

        if(!isFileSupported(fileType, supportedType)){
            res.status(400).json({
                success : false,
                message : "Error while validating the file during the time of File upload at the cloudinary."
            });
        }

        //Step 4 -> Upload this to the Cloudinary Database.If this file is of supported type.
        const response = await fileUploadCloudinary(file, "FileUploadDataBase");

        //Step 5 -> Is to create an entry in the database.
        const fileData = File.create({name,
            tag,
            email,
            imageUrl:response.secure_url
        });

        //Last step is if a successful entry is made then make a Success Response.
        res.status(200).json({
            success : true,
            message : "Video File has been successfully uploaded to the Cloudinary.",
            imageUrl: response.secure_url
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error while the Video Upload Might be not able to Extract file."
        });
    }
}



/*While Uploading a file to the cloudinary we ensure three steps and these are as follow:-
(i) The file is firstly uploded onto the local server at some tempFilePath.
(ii) We upload the file from the servers temp file to the destination in the media server.
(iii) At last we remove that file from the local servers temp file path.*/