import { ValidationError } from "express-validator";


export class RequestvalidationError extends Error{
    statusCode = 400
    
    constructor(public errors: ValidationError[]){
     super()   

     // Only because we are extending a built in class
     Object.setPrototypeOf(this, RequestvalidationError.prototype)

    }
    serializeErrors(){
return  this.errors.map(err=>{
    return {message:err.msg,field:err.param}
})
    }
}