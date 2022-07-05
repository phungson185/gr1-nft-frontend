import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { InfiniteScroll, NextLink } from 'components';
import { useSearch } from 'hooks';
import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { CardItem } from 'views/Cards';

const Items = () => {
  const [dataSearch] = useSearch();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['nftService.fetchItems', dataSearch],
    ({ pageParam: page }) => nftService.fetchItems({ ...dataSearch, page }),
    {
      getNextPageParam: (data) => {
        const { currentPage, pages: totalPages } = data;
        if (currentPage >= totalPages) return undefined;
        return currentPage + 1;
      },
      keepPreviousData: true,
    },
  );

  return (
    <Container className='py-10'>
      <Typography variant='h4' className='mb-10'>
        NFT Items
      </Typography>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <Grid container spacing={3}>
          {data?.pages.map(({ items }, index) => (
            <Fragment key={index}>
              {items.map((item) => (
                <Grid item key={item.id} lg={3}>
                  <NextLink href={publicRoute.itemView.url(item.id)!}>
                    <a>
                      <CardItem item={item} />
                    </a>
                  </NextLink>
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
        <div className='flex justify-center'>{isFetching && <CircularProgress />}</div>
      </InfiniteScroll>
    </Container>
  );
};

export default Items;
