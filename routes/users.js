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






const router = require("express").Router()
const Post =  require("../models/Post")
const User = require("../models/User")

router.post("/",async(req,res)=>{
try{

const userpost =await new Post(req.body).save()
res.send(userpost).status(200)
}catch(err){
console.log(err)
}


})

router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId == req.body.userId){
            await post.updateOne({$set:req.body})
            res.send("post updated").status(200)
        }
    
    }catch(err){
        console.log(err)
    }
    
    
    })

    router.delete("/:id",async(req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            if(post.userId == req.body.userId){
                await post.deleteOne()
                res.send("post deleted").status(200)
            }
        
        }catch(err){
            console.log(err)
        }
        
        
        })


        router.put("/:id/like",async(req,res)=>{
            try{
            
                const post =await Post.findById(req.params.id);

                if(!post.likes.includes(req.body.userId)){
                    await post.updateOne({$push:{likes:req.body.userId}})
                    res.status(200).send("post liked")
                }else{
                    await post.updateOne({$pull:{likes:req.body.userId}})
                    res.status(200).send("post disliked")
                }
            }
            catch(err){

            }
        })




// router.post("/",(req,res)=>{
//     try{
    
//     }catch(err){
        
//     }
    
    
//     })

router.get("/timeline/:id",async(req,res)=>{
    try{
      const currentuser = await User.findById(req.id.params);
      const currentuserPosts = await Post.find({ userId: currentuser._id });
      const followingPosts = await Promise.all(
        currentuser.following.map((followingId) => {
            return Post.find({ userId: followingId });
            })
        )
        res.status(200).json(currentuserPosts.concat(...followingPosts))
    }
    catch(err){
        console.log(err)
    }
})


module.exports=router





const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500,
        required:true
    },
    img:{
        type:String,
    },
    likes:{
     type:Array,
     default:[],
    }
},{timestamps:true})

module.exports = mongoose.model("Post",PostSchema)