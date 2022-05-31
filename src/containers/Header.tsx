import { AppBar, Button, Container, MenuItem, Toolbar } from '@mui/material';
import { NextLink } from 'components';
import { useAnchor } from 'hooks';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signOut } from 'reducers/profileSlice';
import { publicRoute } from 'routes';
import { walletService } from 'services';
import { shorten } from 'utils/common';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, address } = useSelector(profileSelector);

  const [anchorEl, open, onOpen, onClose] = useAnchor();

  const { mutate: connectWallet } = useMutation(walletService.connectWallet);

  return (
    <AppBar position='sticky' className='bg-info-dark'>
      <Toolbar>
        <Container>
          <div className='flex gap-4'>
            {isLoggedIn ? (
              <>
                <NextLink href={publicRoute.create.path}>
                  <a>
                    <Button color='info'>Create</Button>
                  </a>
                </NextLink>
                <Button onClick={onOpen}>{shorten(address)}</Button>
                  <NextLink href={publicRoute.profile.path}>
                    <a>
                      <MenuItem>Profile</MenuItem>
                    </a>
                  </NextLink>
                  <MenuItem onClick={() => dispatch(signOut())}>Disconnect</MenuItem>
              </>
            ) : (
              <>
                <Button onClick={() => connectWallet()}>Connect Wallet</Button>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
