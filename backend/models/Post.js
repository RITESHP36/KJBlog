const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    introduction: {
        type: String
    },
    body: {
        type: String
    },
    subBody: {
        type: String
    },
    conclusion: {
        type: String
    },
    faqs: {
        type: String
    },
    writerDetails: {
        type: String
    },
    sources: {
        type: String
    },
    introductionImage: {
        type: String,
        required: false,
    },
    blogImages: {
        type: [String],
        required: false,
    },
    subBodyImage: {
        type: String,
        required: false,
    },
},{timestamps:true})

module.exports=mongoose.model("Post",PostSchema)