import { Container, Tab, Tabs } from '@mui/material';
import { useRequiredLogin, useTabs } from 'hooks';
import { UserType } from 'models/User';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { userService } from 'services';
import { Items } from './components';

const Profile = ({ user: apiUser }: { user?: UserType }) => {
  const profile = useSelector(profileSelector);
  const address = apiUser?.address || profile.address;
  useRequiredLogin({ requiredLogin: address ? false : true });
  useQuery(['userService.getProfile', { address }], () => userService.getUserProfile({ address: address! }));

  return (
    <Container className='py-20'>
      <Items address={address} />
    </Container>
  );
};

export default Profile;
