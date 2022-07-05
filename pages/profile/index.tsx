import { Profile } from 'views/Profile';
import { PublicLayout } from 'layouts';
import { AppBanner } from 'containers';

const Home = () => {
  return (
    <PublicLayout>
      <AppBanner />
      <Profile />
    </PublicLayout>
  );
};

export default Home;
