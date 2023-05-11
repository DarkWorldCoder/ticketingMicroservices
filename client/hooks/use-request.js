import axios from 'axios'
import {useState} from "react"

export default ({url,method,body,onSuccess})=>{
    const [errors,setErrors] = useState(null)
    
    const makeRequest = async()=>{
        try{
            setErrors(null)
            console.log("hello")
            const response = await axios[method](url,body)
            if(onSuccess){
                onSuccess()
            }
            // console.log(response)
            return response.data 
        }catch(err){
            // console.log(err)
            setErrors(
                <div className="alert alert-danger">
            <h4>Soory..</h4>
            <ul className="my-0">
        {err.response.data.errors.map(err=><li
        key={err.message}
        >{err.message}</li>)}
            </ul>
        </div>
            )

        }
    }
    return [makeRequest,errors]
}