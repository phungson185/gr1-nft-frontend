import { Container, Grid, Typography } from '@mui/material';
import { Spinner } from 'components';
import { ArtworkType } from 'models/Artwork';
import { useQuery } from 'react-query';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { shorten } from 'utils/common';
import { BoxUser } from 'views/Cards';
import { BoxInfo, RelatedArtwork } from './components';

const ArtworkView = ({ item: apiItem }: { item: ArtworkType }) => {
  const { data: item } = useQuery(['nftService.getArtwork', { id: apiItem.id }], () => nftService.getArtwork(apiItem), {
    placeholderData: apiItem,
    refetchInterval: (data) => (data?.status === 'pending' ? 2000 : false),
  }) as { data: ArtworkType };

  return (
    <>
      <Container className='py-20'>
        <Grid container spacing={4}>
          <Grid item lg>
            {item.status === 'pending' ? (
              <Spinner spinning>
                <img src={item.image} className='m-auto' style={{ maxHeight: 600 }} />
              </Spinner>
            ) : (
              <div className='flex flex-col items-center'>
                {Array.from({ length: item.sizeY }).map((_, x) => (
                  <div key={x} className='flex'>
                    {Array.from({ length: item.sizeX }).map((_, y) => (
                      <img
                        key={y}
                        src={`${item.folder}/${y + 1}x${x + 1}.${item.extension}`}
                        style={{ maxHeight: 800 / item.sizeY, maxWidth: 840 / item.sizeX }}
                        className='border-2 hover:cursor-pointer hover:border-primary-main'
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
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
                    image={item.owner.avatar}
                    label='Creator'
                    name={shorten(item.creator.address)}
                    url={publicRoute.authorView.url(item.creator!)}
                  />
                </Grid>
                <Grid item>
                  <BoxUser
                    image={item.owner.avatar}
                    label='Owner'
                    name={shorten(item.owner.address)}
                    url={publicRoute.authorView.url(item.owner!)}
                  />
                </Grid>
              </Grid>
              <BoxInfo item={item!} />
            </div>
          </Grid>
        </Grid>
      </Container>

      <RelatedArtwork item={item} />
    </>
  );
};

export default ArtworkView;
