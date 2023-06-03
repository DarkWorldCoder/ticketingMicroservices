import request from 'supertest';
import { app } from '../../app';
jest.mock("../../nats-wrapper.ts")
const createTicket = async() => {

  const req =  await request(app).post('/').set('Cookie', global.signin()).send({
    title: 'asldkf',
    price: 20,
  });
  
  return req
};

it('can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  // await request(app).post('/').set('Cookie', global.signin()).send({
  //   title: 'asldkf',
  //   price: 20,
  // });
  // await request(app).post('/').set('Cookie', global.signin()).send({
  //   title: 'asldkf',
  //   price: 20,
  // });
  
  const response = await request(app).get('/').send().expect(200);
  // console.log(response.body)
  expect(response.body.length).toEqual(3);
});
