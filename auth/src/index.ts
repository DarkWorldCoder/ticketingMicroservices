import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose'

import { currentUserRouter } from './route/current-user';
import { signinRouter } from './route/signin';
import { signoutRouter } from './route/signout';
import { signupRouter } from './route/signup';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy',true)
app.use(json())
app.use(cookieSession({
    signed:false,
    secure:true
}))
app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signinRouter)
app.use(signupRouter)
app.all("*",async(req,res,)=>{
   throw new NotFoundError()
})

app.use(errorHandler)


const start = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT key not found')
    }
    try{
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
  

  })
  console.log("Connected to database")
}catch(err){
    console.log(err)
}
app.listen(3000,()=>{
    console.log('Listening on port 3000!!')
})
}
start()