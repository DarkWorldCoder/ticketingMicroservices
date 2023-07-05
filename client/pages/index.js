import Link from 'next/link';
import HeroSection from '../components/Hero/HeroSection';
import FeatureSection from '../components/FeatureSection/FeatureSection';
import axios from 'axios';

const LandingPage = ({ currentUser, tickets }) => {
 
  return (
    <>
    <HeroSection />
    <FeatureSection 
    tickets={tickets}
    />
    </>

  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');
  return { tickets: data };
};

export default LandingPage;
