import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from "./orderid.module.scss"
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState({
    second:0,
    minute:0
  });
  const [expires,setExpires] = useState(false)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      var countDownDate = new Date().getTime() + (msLeft); 
      var distance =countDownDate -  new Date().getTime()
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({
        second:seconds,
        minute:minutes
      })
      if(distance<0){
        setExpires(true)
      }

    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

 

  return (
    <div className={`${styles.order_container}`}>
    {expires?
    <div className={`${styles.expired}`}>
    <div className={`${styles.order_expired}`}>OOPS !Order Expired</div>
    <button
    onClick={()=>Router.push("/")}
    >Go Back</button>
    </div>
    :
    <div className={`${styles.timer}`}>
      <div className={`${styles.time}`}>

      <span>{timeLeft.minute} m : {timeLeft.second}s </span>
      </div>
   
    <h3>Time is Ticking. Please Pay fast to save the seat</h3>
    <StripeCheckout
     
      token={({ id }) => doRequest({ token: id })}

      
      stripeKey="pk_test_51I05egGtTrJWux9OqUwbjxYdT3TacczJOPfQOen4PjZaqefk9XDQcPDpkTjNmu38LLaqT2RtJ7NvpyuHJ3lAC8rR00lOyfXUvj"
      amount={order.ticket.price * 100}
      email={currentUser.email}
    />
    {errors}
  </div>
  }
   
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
