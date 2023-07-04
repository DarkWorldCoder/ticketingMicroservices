import Link from 'next/link';
import HeroSection from '../components/Hero/HeroSection';
import FeatureSection from '../components/FeatureSection/FeatureSection';

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets)

  return (
    <>
    <HeroSection />
    <FeatureSection />
    </>
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
  // const data = []
  return { tickets: data };
};

export default LandingPage;
