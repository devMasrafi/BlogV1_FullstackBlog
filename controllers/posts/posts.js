


// create post
const createPostCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "Post created"
        })
    } catch (error) {
        res.json(error)
    }
}

// all posts
const allPostCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "Post list"
        })
    } catch (error) {
        res.json(error)
    }
}
// details
const fetchPostCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "Post details"
        })
    } catch (error) {
        res.json(error)
    }
}
// delete post 
const deletePostCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "Post deleted"
        })
    } catch (error) {
        res.json(error)
    }
}
// Update post
const updatePostCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "Post Updated"
        })
    } catch (error) {
        res.json(error)
    }
}
module.exports ={
    createPostCtrl, allPostCtrl, fetchPostCtrl, deletePostCtrl, updatePostCtrl
}