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




