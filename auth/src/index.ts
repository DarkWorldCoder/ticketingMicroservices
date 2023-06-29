import mongoose from 'mongoose'
import {app} from "./app"
const start = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY MUST BE DEFINED')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO URI MUST BE PROVdIDED here')
    }
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to db now')
    }catch(err){
        console.log(err)
    }
}
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server Listening on ports ${PORT}`))

start()