const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,  
        },
        profileImg: {
            type: String,
        },
        coverImg: {
            type: String,
        },
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
        comment: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
    },
    {
        timestamps: true
    }
)

// Schema --> model
const User = mongoose.model("User", userSchema)

// model export
module.exports = User