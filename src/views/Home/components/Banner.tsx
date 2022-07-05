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
            Discover, Collect and Sell Extraordinary NFTs
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam etiam rhoncus aenean a iaculis aliquet
            rhoncus sed. Accumsan sit consequat, sodales consectetur. Egestas scelerisque ut dui sed nulla morbi quam
            eget luctus. In a vel morbi sed nisi.
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
