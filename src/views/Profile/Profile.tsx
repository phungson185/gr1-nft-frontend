import { Edit } from '@mui/icons-material';
import { Container, IconButton, Paper, Typography } from '@mui/material';
import { NextLink, PerfectScrollbar } from 'components';
import { useRequiredLogin } from 'hooks';
import { UserType } from 'models/User';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { publicRoute } from 'routes';
import { userService } from 'services';
import { shorten } from 'utils/common';
import { TabAssets, UserAvatar } from './components';

const Profile = ({ user: apiUser }: { user?: UserType }) => {
  const profile = useSelector(profileSelector);
  const address = apiUser?.address || profile.address;
  const isOwner = profile.isLoggedIn && !apiUser;
  useRequiredLogin({ requiredLogin: address ? false : true });
  const { data: user } = useQuery(
    ['userService.getUserProfile', { address }],
    () => userService.getUserProfile({ address: address! }),
    { placeholderData: apiUser ?? profile },
  ) as { data: UserType };
  const cover = user.cover || require(`assets/images/cover.png`).default.src;

  return (
    <>
      <div style={{ background: `url(${cover}) no-repeat center / cover`, height: 360 }}></div>
      <Container className='flex items-start gap-10 flex-col md:flex-row mb-20'>
        <Paper className='md:sticky top-[120px] p-6 md:w-[286px] -mt-[40px] rounded-[20px]'>
          <UserAvatar user={user} isOwner={isOwner} />
          <div className='mt-5'>
            <Typography className='font-semibold text-2xl mb-[6px]'>
              {user.username}
              {isOwner && (
                <NextLink href={publicRoute.profileUpdate.path}>
                  <a>
                    <IconButton title='Update Profile' className='-mr-12 ml-2 mb-2'>
                      <Edit />
                    </IconButton>
                  </a>
                </NextLink>
              )}
            </Typography>
            <Typography className='text-secondary-main mb-6'>{shorten(user.address)}</Typography>

            <PerfectScrollbar className='max-h-[40vh] pr-4 -mr-4'>
              <div dangerouslySetInnerHTML={{ __html: user.bio! }} className='text-editor' />
            </PerfectScrollbar>
          </div>
        </Paper>

        <div className='flex-1 py-12'>
          <TabAssets address={address} />
        </div>
      </Container>
    </>
  );
};

export default Profile;
