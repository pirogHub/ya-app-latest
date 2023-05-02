const { Schema, model } = require("mongoose");
const connection_image = require("../connections/images");


const schema = new Schema({
    name: String,

    img:
    {
        data: Buffer,
        contentType: String
    },
    link: String
});


module.exports = connection_image.model('all_imgs', schema); 