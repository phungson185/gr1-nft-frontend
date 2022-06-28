import { Avatar, Typography } from '@mui/material';
import { NextLink } from 'components';

type BoxUserProps = {
  image?: string;
  label?: string;
  name?: string;
  url?: string;
};

const BoxUser = ({ image, label, name, url }: BoxUserProps) => {
  return (
    <div className='flex'>
      {/* <Avatar sx={{ width: 52, height: 52, marginRight: 1 }} src={image} /> */}
      <div>
        <Typography color='textSecondary'>{label}</Typography>
        <Typography variant='subtitle2'>
          {url ? (
            <NextLink href={url}>
              <a className='hover:text-primary-main'>{name}</a>
            </NextLink>
          ) : (
            <span>{name}</span>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default BoxUser;
