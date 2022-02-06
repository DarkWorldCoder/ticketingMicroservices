import { Request,Response,NextFunction } from "express";
import { RequestvalidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection-error";
export const errorHandler = (err:Error,
    req:Request,
    res:Response,
    next:NextFunction)=>{
    if(err instanceof RequestvalidationError){
   
        return res.status(err.statusCode).send({errors:err.serializeErrors()})
    }
    if( err instanceof DatabaseConnectionError){
   return  res.status(err.statusCode).send({errors:err.serializeErrors()})
    }
      console.log('Something went wrong',err)

      res.status(400).send({
          errors:[{message:'Something went wrong'}]
      })
}  