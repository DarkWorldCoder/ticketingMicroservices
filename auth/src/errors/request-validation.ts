import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestvalidationError extends CustomError{
    statusCode = 400
    
    constructor(public errors: ValidationError[]){
     super("Invalid request parameters")   

     // Only because we are extending a built in class
     Object.setPrototypeOf(this, RequestvalidationError.prototype)

    }
    serializeErrors(){
return  this.errors.map(err=>{
    return {message:err.msg,field:err.param}
})
    }
}