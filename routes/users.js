const router = require("express").Router()

router.get("/", (req, res)=>{
    res.send("You have searched for users api")
})


module.exports = router