import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { NextLink } from 'components';

const Footer = () => {
  return (
    <AppBar position='static' color='transparent'>
      <Toolbar>
        <Container className='flex items-center justify-between gap-10'>
          <Typography>© GR1. Hanoi University of Science and Technology</Typography>
          <div className='flex gap-2'>
            <NextLink href='#'>
              <a target='_blank'>
                <IconButton color='primary'>
                  <Facebook fontSize='small' />
                </IconButton>
              </a>
            </NextLink>
            <NextLink href='#'>
              <a target='_blank'>
                <IconButton color='primary'>
                  <Twitter fontSize='small' />
                </IconButton>
              </a>
            </NextLink>
            <NextLink href='#'>
              <a target='_blank'>
                <IconButton color='primary'>
                  <LinkedIn fontSize='small' />
                </IconButton>
              </a>
            </NextLink>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
