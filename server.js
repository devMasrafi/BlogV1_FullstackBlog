require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users/users.js");
const postRoutes = require("./routes/posts/posts.js");
const commentRoutes = require("./routes/comments/comments.js");
const globalErrHandler = require("./middlewares/globalHandler.js");
require("./config/dbConnect.js")



const app = express()

//middleware

app.use(express.json()) //pass incoming data

// userRoutes
app.use("/api/v1/users", userRoutes);
// Post route
app.use("/api/v1/posts", postRoutes)
// comment
app.use("/api/v1/comments", commentRoutes)

// error Handler middleware
app.use(globalErrHandler)
// listen server

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`server is running on port ${PORT}`));
