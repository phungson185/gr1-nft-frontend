import { Camera } from '@mui/icons-material';
import { CardMedia, Paper, Typography } from '@mui/material';
import { ItemType } from 'models/Item';
import style from './card.module.scss';

const CardItem = ({ item, isArtwork }: { item: ItemType; isArtwork?: boolean }) => {
  const isSale = item.sale?.cancelled === false;
  return (
    <Paper className={style.cardContainer}>
      <CardMedia
        image={item.image || require('assets/images/placeholder_9_9.png').default.src}
        className='flex items-end rounded-t-2xl h-[360px] border-b relative'
      >
        {isSale && (
          <div className='bg-black/50 text-white w-full m-6 p-4 rounded-lg'>
            <Typography>
              {item.sale?.price} {item.sale?.paymentToken.symbol}
            </Typography>
          </div>
        )}
        {isArtwork && (
          <div className='bg-black/50 text-white absolute top-3 right-3 p-1.5 rounded'>
            <Camera />
          </div>
        )}
      </CardMedia>
      <div className='p-6'>
        <Typography variant='subtitle1' align='center'>
          {item.name || '—'}
        </Typography>
      </div>
    </Paper>
  );
};

export default CardItem;
