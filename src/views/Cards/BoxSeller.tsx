import { Avatar, Typography } from '@mui/material';
import { NextLink } from 'components';

type BoxSellerProps = {
  image?: string;
  label: string;
  name: string;
  url: string;
};

const BoxSeller = ({ image, label, name, url }: BoxSellerProps) => {
  return (
    <div className='flex'>
      <Avatar variant='rounded' sx={{ width: 60, height: 60, marginRight: 1 }} src={image} />
      <div>
        <Typography variant='h6'>
          <NextLink href={url}>
            <a className='hover:text-primary-main'>{name}</a>
          </NextLink>
        </Typography>
        <Typography color='textSecondary'>{label}</Typography>
      </div>
    </div>
  );
};

export default BoxSeller;
