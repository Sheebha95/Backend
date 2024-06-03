const router = require("express").Router()
const User = require("../models/User");

router.get("/register", async(req, res) => {
    const user = new User ({
        username: "Rani",
        password: "12344",
        email: "rani@gmail.com"
    });
    
    try{
        const savedUser = await user.save();
        res.json(savedUser);

    } catch(err){
        res.status(400).json({message: err.message});
    }

});


module.exports = router