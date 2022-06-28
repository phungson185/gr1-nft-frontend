import { Container, Grid, Typography } from '@mui/material';
import { ItemType } from 'models/Item';
import { useQuery } from 'react-query';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { shorten } from 'utils/common';
import { BoxUser } from 'views/Cards';
import { BoxInfo, BoxPrice, RelatedItem } from './components';

const ItemView = ({ item: apiItem }: { item: ItemType }) => {
  const { data: item } = useQuery(['nftService.getItem', { id: apiItem.id }], () => nftService.getItem(apiItem), {
    placeholderData: apiItem,
  }) as { data: ItemType };

  return (
    <>
      <Container className='py-20'>
        <Grid container spacing={4}>
          <Grid item lg={7}>
            <img src={item.image} className='rounded-2xl m-auto' style={{ maxHeight: 600 }} />
          </Grid>
          <Grid item lg={5} className='flex flex-col'>
            <div>
              <Typography variant='h3' className='mb-4'>
                {item.name}
              </Typography>
              <Typography variant='subtitle2' color='textSecondary' className='whitespace-pre-line'>
                {item.description}
              </Typography>

              <Grid container spacing={4} className='my-6'>
                <Grid item sx={{ minWidth: 240 }}>
                  <BoxUser
                    // image={item.owner.avatar}
                    label='Creator'
                    name={shorten(item.creatorAddress)}
                    // url={publicRoute.authorView.url(item.creator!)}
                  />
                </Grid>
              </Grid>
              <BoxInfo item={item!} />
            </div>
          </Grid>
        </Grid>
      </Container>

      <RelatedItem item={item} />
    </>
  );
};

export default ItemView;
