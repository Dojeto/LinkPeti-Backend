import { Router } from "express";
import auth from "../middleware/authorization.js";
import db from '../models/schema.js'

const router = Router();

router.post('/addlink', auth ,async(req,resp)=>{
    try {
        const {appname , link} = req.body;
        const user = await db.findById(req.user);
        const addlinks = await db.findOneAndUpdate({
            username : user.username
        },{
            userinput:
            {
                appname : [...user.userinput.appname,appname],
                links : [...user.userinput.links,link] 
            }
        })
        resp.status(200).json(addlinks);
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/removelink', auth ,async(req,resp)=>{
    try {
        const {appname} = req.body;
        const user = await db.findById(req.user);
        const index = user.userinput.appname.indexOf(appname);
        if(index < 0)
        {
               resp.status(401).json("Url Not Found");
        }
        user.userinput.appname.splice(index,1);
        user.userinput.links.splice(index,1);
        const addlinks = await db.findOneAndUpdate({
            username : user.username
        },{
            userinput:
            {
                appname : [...user.userinput.appname],
                links : [...user.userinput.links]
            }
        })
        resp.status(200).json(addlinks);
    } catch (err) {
        console.log(err.message)
    }
})

router.get('/getall/:username',async (req,resp)=>{
    const user = req.params.username;
    // resp.send(user);
    const data = await db.findOne({
        username:user.toLowerCase()
    })
    resp.send(data);
})
export default router;