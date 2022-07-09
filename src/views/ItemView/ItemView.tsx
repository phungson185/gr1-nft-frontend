import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { NextLink, PerfectScrollbar, TextEditor } from 'components';
import { CommentType } from 'models/Comment';
import { ItemType } from 'models/Item';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { commentService, nftService } from 'services';
import { shorten } from 'utils/common';
import { BoxUser } from 'views/Cards';
import { BoxComment, RelatedItem } from './components';

const ItemView = ({ item: apiItem }: { item: ItemType }) => {
  const profile = useSelector(profileSelector);
  const [comment, setComment] = useState('');
  const [dataComment, setDataComment] = useState<CommentType[]>([]);

  const { data: item } = useQuery(['nftService.getItem', { id: apiItem.id }], () => nftService.getItem(apiItem), {
    placeholderData: apiItem,
    onSuccess: (data) => {
      setDataComment(data.comments);
    },
  }) as { data: ItemType };

  const { mutate: createComment } = useMutation(commentService.comment, {
    onSuccess: (data) => {
      setDataComment([data, ...dataComment]);
    },
  });

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
                <Grid container spacing={10}>
                  <Grid item xs={12}>
                    <Typography variant='h3' className='mb-4'>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle2' color='textSecondary' className='whitespace-pre-line'>
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <BoxUser image={item.creator.avatar} label='Creator' name={shorten(item.creator.address)} />
                  </Grid>
                  <Grid item xs={12}>
                    <NextLink href={`https://testnet.bscscan.com/tx/${item.transactionHash}`}>
                      <Button>View on Bscscan</Button>
                    </NextLink>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Paper className='p-6'>
              <Typography variant='subtitle1' color='textSecondary'>
                Comments
              </Typography>
              <TextEditor name='comments' onChange={setComment} />
              <Button
                className='my-2'
                onClick={() =>
                  createComment({
                    itemId: item.id,
                    content: comment,
                    userAddress: profile.address!,
                  })
                }
              >
                Send
              </Button>
              <PerfectScrollbar className='min-h-[19vh] pr-4 -mr-4'>
                <Paper className='flex flex-col gap-5 p-5'>
                  {dataComment.map((comment, index) => (
                    <BoxComment key={index} username={comment.userAddress} content={comment.content} />
                  ))}
                </Paper>
              </PerfectScrollbar>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <RelatedItem item={item} />
    </>
  );
};

export default ItemView;
