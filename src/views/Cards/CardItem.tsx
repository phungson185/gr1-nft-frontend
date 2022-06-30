import { CardMedia, Paper, Typography } from '@mui/material';
import { ItemType } from 'models/Item';
import style from './card.module.scss';

const CardItem = ({ item }: { item: ItemType }) => {
  return (
    <Paper className={style.cardContainer}>
      <CardMedia
        image={item.image || require('assets/images/placeholder_9_9.png').default.src}
        className='flex items-end rounded-t-2xl h-[360px] border-b relative'
      ></CardMedia>
      <div className='p-6'>
        <Typography variant='subtitle1' align='center'>
          {item.name || '—'}
        </Typography>
      </div>
    </Paper>
  );
};

export default CardItem;
