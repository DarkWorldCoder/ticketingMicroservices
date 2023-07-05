import Router from "next/router";
import styles from "./index.module.scss"
const OrderIndex = ({ orders }) => {
  const handleOnClick = (status,id)=>{
    if(status == "created"){
      Router.push(`/orders/${id}`)
    }
  }
  return (
    <div className={`${styles.order_container}`}>
      <h1>Your Orders</h1>
      <div className={`${styles.order_wrapper}`}>

      {orders.map((order) => {
        return (
         <div className={`${styles.card_container}`}>
        <img src={order.ticket.imageUrl} />
        <p>${order.ticket.price}</p>
        <h2>{order.ticket.title}</h2>
        <h4>{order.ticket.location}</h4>
        
         <div 
         onClick={()=>handleOnClick(order.status,order.id)}
         className={`${styles[order.status]} ${styles.button}` }
        >
            {order.status}
         </div>
        
       
    </div>
          
        );
      })}
      </div>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
