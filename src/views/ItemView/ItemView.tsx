import { CategoryOutlined } from '@mui/icons-material';
import { Button, Container, Grid, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { NextLink, PerfectScrollbar, TextEditor } from 'components';
import { useAnchor, useSearch } from 'hooks';
import { CommentType } from 'models/Comment';
import { ItemType } from 'models/Item';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { commentService, nftService, walletService } from 'services';
import { shorten } from 'utils/common';
import { BoxUser } from 'views/Cards';
import { BoxComment, RelatedItem } from './components';

const ItemView = ({ item: apiItem }: { item: ItemType }) => {
  const profile = useSelector(profileSelector);
  const [comment, setComment] = useState('');
  const [dataComment, setDataComment] = useState<CommentType[]>([]);
  const [dataSearch, setDataSearch] = useSearch({ itemId: apiItem.id });
  const [orderBy, setOrderBy] = useState('createdAt');
  const [desc, setDesc] = useState('true');
  const [anchorSort, openSort, onOpenSort, onCloseSort] = useAnchor();

  const { data: item } = useQuery(['nftService.getItem', { id: apiItem.id }], () => nftService.getItem(apiItem), {
    placeholderData: apiItem,
  }) as {
    data: ItemType;
  };

  useQuery(['commentService.getComments', dataSearch], () => commentService.getComments(dataSearch), {
    onSuccess: (comments) => {
      setDataComment(comments);
    },
    cacheTime: 0,
  }) as {
    data: CommentType[];
  };

  const { mutate: createComment } = useMutation(commentService.createComment, {
    onSuccess: (data) => {
      setDataComment([data, ...dataComment]);
    },
  });

  const { mutate: connectWallet } = useMutation(walletService.connectWallet);

  const SORT_TYPES = [
    { orderBy: 'createdAt', desc: 'true', name: 'Newest comment' },
    { orderBy: 'createdAt', desc: 'false', name: 'Oldest comment' },
  ];

  useEffect(() => {
    setDataSearch({ itemId: apiItem.id, orderBy, desc });
  }, [setDataSearch, apiItem.id, orderBy, desc]);
  return (
    <>
      <Container className='py-20'>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item lg={7}>
                <img src={item.image} className='rounded-2xl m-auto' style={{ maxHeight: 600 }} />
              </Grid>

              <Grid item lg={5}>
                <Paper className='p-6'>
                  <Typography variant='subtitle1' color='textSecondary'>
                    Comments
                  </Typography>

                  <TextEditor name='comments' onChange={setComment} />
                  <div className='flex justify-between'>
                    {profile.address ? (
                      <>
                        <Button
                          className='my-2'
                          onClick={() =>
                            createComment({
                              itemId: item.id,
                              content: comment,
                              username: profile.username!,
                              avatar: profile.avatar!,
                            })
                          }
                        >
                          Send
                        </Button>

                        <Button
                          variant='text'
                          color='inherit'
                          classes={{ textInherit: 'bg-white hover:brightness-90 px-4' }}
                          startIcon={<CategoryOutlined />}
                          onClick={onOpenSort}
                        >
                          {SORT_TYPES.find((item) => item.orderBy === orderBy && item.desc === desc)?.name ??
                            SORT_TYPES[0].name}
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
                      </>
                    ) : (
                      <Button className='my-2' onClick={() => connectWallet()}>
                        Connect wallet
                      </Button>
                    )}
                  </div>
                  <PerfectScrollbar className='max-h-[26vh] pr-4 -mr-4'>
                    <Paper className='flex flex-col gap-5 p-5'>
                      {dataComment.map((comment, index) => (
                        <BoxComment
                          key={index}
                          avatar={comment.avatar}
                          username={comment.username}
                          content={comment.content}
                        />
                      ))}
                    </Paper>
                  </PerfectScrollbar>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={10}>
              <Grid item xs={12}>
                <Typography variant='h3' className='mb-4'>
                  {item.name}
                </Typography>
                <Typography variant='subtitle2' color='textSecondary' className='whitespace-pre-line'>
                  {item.description}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <BoxUser image={item.creator.avatar} label='Creator' name={shorten(item.creator.address)} />
              </Grid>

              <Grid item xs={3}>
                <BoxUser image={item.owner.avatar} label='Owner' name={shorten(item.owner.address)} />
              </Grid>

              <Grid item xs={4}>
                <NextLink href={`https://testnet.bscscan.com/tx/${item.transactionHash}`}>
                  <Button>View on Bscscan</Button>
                </NextLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <RelatedItem item={item} />
    </>
  );
};

export default ItemView;
