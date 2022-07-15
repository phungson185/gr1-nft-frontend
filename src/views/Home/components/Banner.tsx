import { CardMedia, Container, Paper, Typography } from '@mui/material';

const Banner = () => {
  return (
    <div
      style={{ background: `url(${require('assets/images/banner-home.png').default.src}) no-repeat center / contain` }}
      className='bg-info-dark mb-10'
    >
      <Container className='flex items-center h-[720px] relative'>
        <div className='flex-1 mr-6 text-white max-w-md'>
          <Typography variant='h3' className='mb-4'>
            NFT Discussion
          </Typography>
          <Typography>A social network for NFTs. Create your own NFT and share it with the world.</Typography>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
