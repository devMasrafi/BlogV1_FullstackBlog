
// create comment 
const createCommentCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "comment created"
        })
    } catch (error) {
        res.json(error)
    }
}

const commentDetailsCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "comment details"
        })
    } catch (error) {
        res.json(error)
    }
}
// delete Comment
const deleteCommentCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "comment deleted"
        })
    } catch (error) {
        res.json(error)
    }
}

// update comment
const updateCommentCtrl = async(req, res) =>{
    try{
        res.json({
            status: "success",
            user: "comment Updated"
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    createCommentCtrl, commentDetailsCtrl, deleteCommentCtrl, updateCommentCtrl
}