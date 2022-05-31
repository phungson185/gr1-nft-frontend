import { Breadcrumbs, Container, Typography } from '@mui/material';
import { NextLink } from 'components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { publicRoute } from 'routes';

type BannerType = {
  image?: string;
};

const Banner = ({ image }: BannerType) => {
  const router = useRouter();

  const routes = (router.pathname.match(/\/[\w-\[\]]+/g) ?? [])
    .map((_, index, array) => array.slice(0, index + 1).join(''))
    .map((item) => Object.values(publicRoute).find((route) => item === route.path))
    .filter((item) => item?.name);
  routes.unshift(publicRoute.home);

  const [banner] = useState(() => {
    const index = Math.floor(1 + Math.random() * 4);
    return require(`assets/images/banner-${index}.png`).default.src;
  });

  return (
    <div style={{ background: `url(${image ?? banner}) no-repeat center / cover` }}>
      <Container className='flex items-center h-[360px] relative'>
        <div>
          <Typography variant='h3' color='white' className='my-4'>
            {routes[routes.length - 1]?.name}
          </Typography>
          <Breadcrumbs className='text-white/80'>
            {routes.map((item, index) => {
              const isRegex = item?.path.includes('[');
              return isRegex ? (
                <span key={index} className='text-lg'>
                  {item?.name}
                </span>
              ) : (
                <NextLink key={index} href={item?.path!}>
                  <a className='hover:text-primary-main text-lg'>{item?.name}</a>
                </NextLink>
              );
            })}
          </Breadcrumbs>
        </div>
        <img
          src={require('assets/icons/inner-shape1.png').default.src}
          style={{ animation: 'bounce 5s infinite' }}
          className='absolute top-[30%] right-[10%]'
        />
        <img
          src={require('assets/icons/inner-shape2.png').default.src}
          style={{ animation: 'bounce 8s infinite' }}
          className='absolute bottom-[30%] right-[20%]'
        />
      </Container>
    </div>
  );
};

export default Banner;
