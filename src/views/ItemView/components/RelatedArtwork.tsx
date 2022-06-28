import { Container, Grid, Typography } from '@mui/material';
import { NextLink } from 'components';
import { useSearch } from 'hooks';
import { ArtworkType } from 'models/Artwork';
import { useQuery } from 'react-query';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { CardItem } from 'views/Cards';

const RelatedArtwork = ({ item }: { item: ArtworkType }) => {
  const [dataSearch] = useSearch({ size: 10 });

  const { data } = useQuery(['nftService.fetchArtworks', dataSearch], () => nftService.fetchArtworks(dataSearch));
  const { items = [] } = data ?? {};

  return (
    <Container className='py-10'>
      <div className='flex justify-between mb-8'>
        <Typography variant='h4'>Related Artworks</Typography>
      </div>
      <Grid container spacing={4}>
        {items
          .filter((next) => next.id !== item.id)
          .slice(0, 8)
          .map((item) => (
            <Grid item key={item.id} lg={3}>
              <NextLink href={publicRoute.artworkView.url(item)!}>
                <a>
                  <CardItem item={item} isArtwork />
                </a>
              </NextLink>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default RelatedArtwork;
