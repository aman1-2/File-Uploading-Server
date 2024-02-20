//For creating a schema or a module we need to import the mongoose instance.
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    imageUrl : {
        type : String,
        require : true
    },
    tags : {
        type:String
    },
    email : {
        type:String
    }
});

module.exports = mongoose.model("File",fileSchema);