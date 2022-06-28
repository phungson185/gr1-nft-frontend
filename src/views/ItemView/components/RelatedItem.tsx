import { Container, Grid, Typography } from '@mui/material';
import { NextLink } from 'components';
import { useSearch } from 'hooks';
import { ItemType } from 'models/Item';
import { useQuery } from 'react-query';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { CardItem } from 'views/Cards';

const RelatedItem = ({ item }: { item: ItemType }) => {
  const [dataSearch] = useSearch({ size: 10, listedOnMarket: 'true' });

  const { data } = useQuery(['nftService.fetchItems', dataSearch], () => nftService.fetchItems(dataSearch));
  const { items = [] } = data ?? {};

  return (
    <Container className='py-10'>
      <div className='flex justify-between mb-8'>
        <Typography variant='h4'>Related Items</Typography>
      </div>
      <Grid container spacing={4}>
        {items
          .filter((next) => next.id !== item.id)
          .slice(0, 8)
          .map((item) => (
            <Grid item key={item.id} lg={3}>
              <NextLink href={publicRoute.itemView.url(item.id)!}>
                <a>
                  <CardItem item={item} />
                </a>
              </NextLink>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default RelatedItem;
