import { AppBanner } from 'containers';
import { PublicLayout } from 'layouts';
import { Create } from 'views/Create';

const Page = () => {
  return (
    <PublicLayout>
      <AppBanner />
      <Create />
    </PublicLayout>
  );
};

export default Page;
