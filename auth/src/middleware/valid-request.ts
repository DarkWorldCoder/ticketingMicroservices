import {Request,Response,NextFunction, response} from 'express'
import { validationResult } from 'express-validator'
import { RequestvalidationError } from '../errors/request-validation'

export const validateRequest = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new RequestvalidationError(errors.array())

    }
    next()
}