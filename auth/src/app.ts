import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
  
import mongoose from 'mongoose'
import  cookieSession from "cookie-session"
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler,NotFoundError} from '@eterosoft/common'

const app = express()


app.use(json())
app.set('trust proxy',true)
app.use(cookieSession({
    signed:false,
    secure:false
}))
app.get("/",(req,res)=>{
    res.send("Hello World nowis the time")
})
app.get("/all",(req,res)=>{
    console.log("hellso")
    res.send("hello")
})
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all("*",()=>{
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}