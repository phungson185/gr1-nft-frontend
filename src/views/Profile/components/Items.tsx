import { CircularProgress, Grid } from '@mui/material';
import { InfiniteScroll, NextLink } from 'components';
import { useSearch } from 'hooks';
import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { CardItem } from 'views/Cards';

const Items = ({ address }: { address?: string }) => {
  const profile = useSelector(profileSelector);
  const isOwner = profile.address === address;

  const [dataSearch] = useSearch({ owner: address, listedOnMarket: isOwner ? '' : 'true' });

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
      <div className='flex justify-center py-10'>{isFetching && <CircularProgress />}</div>
    </InfiniteScroll>
  );
};

export default Items;
