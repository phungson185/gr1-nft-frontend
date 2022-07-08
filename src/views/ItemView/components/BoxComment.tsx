import { Avatar, Typography } from '@mui/material';
import { NextLink } from 'components';

type BoxCommentProps = {
  image?: string;
  username?: string;
  content?: string;
};

const BoxComment = ({ image, username, content }: BoxCommentProps) => {
  return (
    <div className='flex'>
      <Avatar sx={{ width: 52, height: 52, marginRight: 1 }} src={image} />
      <div>
        <Typography color='textSecondary'>{username}</Typography>
        <Typography variant='subtitle2'>
          <div dangerouslySetInnerHTML={{ __html: content! }} className='text-editor' />
        </Typography>
      </div>
    </div>
  );
};

export default BoxComment;
