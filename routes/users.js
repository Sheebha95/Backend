const router = require("express").Router()
const User = require("../models/User")

router.put("/:id" , async(req,res)=>{
 try{
   if(req.body.userid==req.params.id){
      const user = await User.findByIdAndUpdate(req.params.id , {
         $set:req.body
      })
      res.json(user)
     }
   }
      catch(err){
         console.log(err)
      }
 
})

//deleting account

router.delete("/:id" , async(req,res)=>{
   try{
     if(req.body.userid==req.params.id){
        const user = await User.findByIdAndDelete(req.params.id )
        res.json("Account Deleted")
       }
     }
        catch(err){
           console.log(err)
        }
   
  })

  router.get("/:username",async(req,res)=>{
   const user =await User.findOne({username:req.params.username})
   
   res.status(200).send(user)
  })


  //following a user
  router.put("/:id/follow", async(req,res)=>{
  if(req.params.id !== req.body.userid){
   try{
      const user = await User.findById(req.params.id) //about to follow
      const currentuser = await User.findById(req.body.userid) //me
      if(!user.followers.includes(req.body.userid)){
         await user.updateOne({$push:{followers:req.body.userid}})
         await currentuser.updateOne({$push:{followings:req.params.id}})
         res.json("user followed ")
      }else{
         res.json("you already follow this account")
      }
     

   }catch(err){
console.log(err)
   }
  }
  else{
   res.send("you cant follow yourself")
  }
  })
  router.put("/:id/unfollow", async(req,res)=>{
   if(req.params.id !== req.body.userid){
    try{
       const user = await User.findById(req.params.id)
       const currentuser = await User.findById(req.body.userid)
       if(user.followers.includes(req.body.userid)){
          await user.updateOne({$pull:{followers:req.body.userid}})
          await currentuser.updateOne({$pull:{followings:req.params.id}})
          res.json("user unfollowed ")
       }else{
          res.json("you already unfollow this account")
       }
      
 
    }catch(err){
 console.log(err)
    }
   }
   else{
    res.send("you cant unfollow yourself")
   }
   })

  
module.exports=router







