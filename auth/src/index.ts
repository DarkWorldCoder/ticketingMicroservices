import express from 'express';
import {json} from 'body-parser'
import { currentUserRouter } from './route/current-user';
import { signinRouter } from './route/signin';
import { signoutRouter } from './route/signout';
import { signupRouter } from './route/signup';
import { errorHandler } from './middleware/errorHandler';
const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(errorHandler)
app.listen(3000,()=>{
    console.log('Listening on port 3000!!')
})