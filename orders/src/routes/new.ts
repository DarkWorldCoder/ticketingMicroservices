import express, {Request, Response} from 'express';
import mongoose from 'mongoose'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth,validateRequest } from '@eterosoft/common';
import {body} from "express-validator"
import { Ticket } from '../models/tickets';
import { Order } from '../models/order';
import { OrderCreatedublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60
router.post('/', 
requireAuth,
[
    body('ticketId')
    // .not()
    // .custom((input:string) => mongoose.Types.ObjectId.isValid(input))
    // .isEmpty()
    // .withMessage("Ticket must be provided")
],
validateRequest
,async(req:Request, res:Response) => {

    const {ticketId}=req.body
    console.log(ticketId)

    const ticket = await Ticket.findById(ticketId)


    if(!ticket){
        throw new NotFoundError()
    }

    const isReserved = await ticket.isReserved()
    

    if(isReserved){
        throw new BadRequestError("Ticket is already reserved")
    }

    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS) 

    const order = Order.build({
        userId:req.currentUser!.id,
        status:OrderStatus.Created,
        expiresAt:expiration,
        ticket
    })
    await order.save()

    


    new OrderCreatedublisher(natsWrapper.client).publish({
        id:order.id,
        status:order.status,
        userId:order.userId,
        version:order.version,
        expiresAt: order.expiresAt.toISOString(),
        ticket:{
            id:ticket.id,
            price:ticket.price
        }
    })
    res.status(201).send(order)
})

export  {router as newOrderRouter}