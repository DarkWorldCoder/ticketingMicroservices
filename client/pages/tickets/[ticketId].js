import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Card from '../../components/Card/Card';
import styles from "./ticketid.module.scss"
const TicketShow = ({ ticket }) => {

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });


  return (
    <div className={`${styles.order_now}`}>
      <h1>Purchase Queue</h1>
      <Card
      details={true}
      ticket={ticket}/>
      {errors}
      <button onClick={() => doRequest()} className={`${styles.button}`}>
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
