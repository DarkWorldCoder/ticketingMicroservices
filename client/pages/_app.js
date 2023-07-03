import buildClient from '../api/build-client';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/header';
import "../styles/global.css"
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Navbar />
      {/* <Header currentUser={currentUser} /> */}
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
