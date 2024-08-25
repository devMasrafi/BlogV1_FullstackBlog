const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["react js", "html", "css", "node js", "javascripit", "other"],
        },
        img:{
            type: String,
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    {
        timestamps: true
    }
)

// Schema --> model
const Post = mongoose.model("Post", postSchema)

// model export
module.exports = Post