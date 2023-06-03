import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/${id}`)
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(401);
});

it('returns 200 if user updates the ticket he have created', async () => {
  const response = await request(app)
    .post('/')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 20,
    });
    console.log(response.body.id)
  await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'alskdjflskjdf',
      price: 1000,
    })
    .expect(200);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'alskdfjj',
      price: -10,
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(100);
});

it('publishes an event ',async()=>{
  const response = await request(app)
    .post('/')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 20,
    });
    
  await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'alskdjflskjdf',
      price: 1000,
    })
    .expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
  })