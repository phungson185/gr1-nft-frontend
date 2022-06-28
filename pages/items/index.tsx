import { AppBanner } from 'containers';
import { PublicLayout } from 'layouts';
import { publicRoute } from 'routes';

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: publicRoute.discover.path,
      permanent: false,
    },
  };
};

const Home = () => {
  return (
    <PublicLayout>
      <AppBanner />
    </PublicLayout>
  );
};

export default Home;
