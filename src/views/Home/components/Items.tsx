import { CategoryOutlined } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  debounce,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { InfiniteScroll, NextLink } from 'components';
import { useAnchor, useSearch } from 'hooks';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { publicRoute } from 'routes';
import { nftService } from 'services';
import { CardItem } from 'views/Cards';

const Items = () => {
  const [dataSearch, setDataSearch] = useSearch();
  const [anchorSort, openSort, onOpenSort, onCloseSort] = useAnchor();
  const [orderBy, setOrderBy] = useState('createdAt');
  const [desc, setDesc] = useState('true');
  const [search, setSearch] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['nftService.fetchItems', dataSearch],
    () => nftService.fetchItems({ ...dataSearch }),
    {
      getNextPageParam: (data) => {
        const { currentPage, pages: totalPages } = data;
        if (currentPage >= totalPages) return undefined;
        return currentPage + 1;
      },
      keepPreviousData: true,
    },
  );

  const SORT_TYPES = [
    { orderBy: 'createdAt', desc: 'true', name: 'Newest item' },
    { orderBy: 'createdAt', desc: 'false', name: 'Oldest item' },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChangeParams = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    [],
  );

  useEffect(() => {
    setDataSearch({ orderBy, desc, search });
  }, [setDataSearch, orderBy, desc, search]);

  return (
    <Container className='py-10'>
      <div className='flex justify-between mb-10'>
        <Typography variant='h4'>NFT Items</Typography>
        <div className='flex border-2'>
          <div>
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Item name or description'
              onChange={(event) => {
                const { value } = event.target;
                debounceChangeParams(value);
              }}
            />
          </div>
          <Button
            variant='text'
            color='inherit'
            classes={{ textInherit: 'bg-white hover:brightness-90 px-4' }}
            startIcon={<CategoryOutlined />}
            onClick={onOpenSort}
          >
            {SORT_TYPES.find((item) => item.orderBy === orderBy && item.desc === desc)?.name ?? SORT_TYPES[0].name}
          </Button>
          <Menu
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            anchorEl={anchorSort}
            open={openSort}
            onClose={onCloseSort}
            onClick={onCloseSort}
          >
            {SORT_TYPES.map((item, index) => (
              <MenuItem
                key={index}
                classes={{ selected: 'bg-info-light' }}
                selected={item.orderBy === orderBy && item.desc === desc}
                onClick={() => {
                  setOrderBy(item.orderBy);
                  setDesc(item.desc);
                }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
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
