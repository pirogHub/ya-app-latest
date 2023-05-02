const { Schema, model } = require("mongoose");
const connection_randoms = require("../../connections/randoms");


const schema = new Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    link: String
});

module.exports = connection_randoms.model('Random_Img', schema); 