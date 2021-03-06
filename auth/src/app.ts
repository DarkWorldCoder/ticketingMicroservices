import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'

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

export {app}
