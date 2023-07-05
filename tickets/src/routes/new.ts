import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@eterosoft/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import cloudinary from '../utils/cloudinary';

const router = express.Router();

router.post(
  '/',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // console.log(req.body)
    const { title, price,location,image } = req.body;
    
  
    const upload_response = await cloudinary.v2.uploader.upload(image, {
      upload_preset: `profile_pic`,
    });

    const ticket = Ticket.build({
      title,
      price,
      location,
      imageUrl:upload_response.url,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      location: ticket.location,
      imageUrl: upload_response.url
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
