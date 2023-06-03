import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-created-publishers';
console.clear()

const stan = nats.connect("ticketing","abc",{
    url:'http://localhost:4222'
});

stan.on('connect',async()=>{
    console.log('Publisher conencted to nats')

    const publisher = new TicketCreatedPublisher(stan);

    await publisher.publish({
        id:"123",
        title:"concert",
        price:20
    })
    // const data = JSON.stringify({
    //     id:"23",
    //     title:"concer",
    //     price:20
    // })

    // stan.publish("ticket:created",data,()=>{
    //     console.log("Event published")
    // })
})