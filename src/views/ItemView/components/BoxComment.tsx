import { Avatar, Typography } from '@mui/material';

type BoxCommentProps = {
  avatar: string;
  username?: string;
  content?: string;
};

const BoxComment = ({ avatar, username, content }: BoxCommentProps) => {
  return (
    <div className='flex'>
      <Avatar sx={{ width: 52, height: 52, marginRight: 1 }} src={avatar} />
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
