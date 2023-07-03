import Link from 'next/link';
import HeroSection from '../components/Hero/HeroSection';

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets)

  return (
    <HeroSection />
    // <div>
    //   <h1>Tickets</h1>
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th>Title</th>
    //         <th>Price</th>
    //         <th>Link</th>
    //       </tr>
    //     </thead>
    //     <tbody>{ticketList}</tbody>
    //   </table>
    // </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');
  console.log(data)
  return { tickets: data };
};

export default LandingPage;
