const router = require("express").Router()
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.post("/register", async(req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await new User ({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    }).save();   

    res.status(200).send(user)

    } catch(err){
        console.log(err)
    }

});

//login

router.post("/login", async (req, res) => {
    try{
        
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send("User Not Found")
    }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(user.password)
    if(!validPassword){
         return res.status(400).send("Invalid Password")
    }
        res.status(200).send(user)
    }catch(err){
        console.log(err)    
    } 
})


module.exports = router