import { Request,Response,NextFunction } from "express";
import { RequestvalidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection-error";
export const errorHandler = (err:Error,
    req:Request,
    res:Response,
    next:NextFunction)=>{
      console.log('Something went wrong',err)

      res.status(400).send({
          message:err.message
      })
}  