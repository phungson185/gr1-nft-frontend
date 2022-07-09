import { LoadingButton } from '@mui/lab';
import { Avatar, Container, FormControl, Paper, TextField, Typography } from '@mui/material';
import { TextEditor } from 'components';
import UploadLabel from 'components/UploadLabel';
import { UserUpdateType } from 'models/User';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signIn } from 'reducers/profileSlice';
import { publicRoute } from 'routes';
import { fileService, queryClient, userService } from 'services';
import { getBase64 } from 'utils/common';

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector(profileSelector);

  const [cover, setCover] = useState(profile.cover);
  const [coverLoading, setCoverLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, clearErrors, setValue } = useForm();

  useEffect(() => {
    setValue('username', profile.username);
    setValue('bio', profile.bio);
  }, [profile, setValue]);

  const { mutate: updateProfile, isLoading } = useMutation(userService.updateProfile, {
    onSuccess: (data) => {
      dispatch(signIn(data));
      enqueueSnackbar('Update profile successfully', { variant: 'success' });
      queryClient.invalidateQueries('userService.getUserProfile');

      router.push(publicRoute.profile.path);
    },
  });

  const handleClickSubmit = () => {
    setValue('address', profile.address);
    handleSubmit((values) => {
      updateProfile(values as UserUpdateType);
    })();
  };

  const handleChangeCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    getBase64(file, setCover);

    const formData = new FormData();
    formData.append('image', file as Blob);

    setCoverLoading(true);
    fileService
      .uploadFile(formData)
      .then((url) => {
        setValue('cover', url.data.data);
        clearErrors('cover');
      })
      .finally(() => {
        setCoverLoading(false);
      });
  };

  return (
    <Container maxWidth='md' className='py-20'>
      <Typography variant='h4' className='mb-4'>
        Update Profile
      </Typography>
      <Paper className='p-6'>
        <div className='flex items-center gap-6 mb-6'>
          <Avatar src={profile.avatar} className='w-[160px] h-[160px] border-2 border-secondary-main' />
          <div>
            <Typography variant='h4'>{profile.username}</Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {profile.address}
            </Typography>
          </div>
        </div>

        <Controller
          name='cover'
          defaultValue=''
          control={control}
          rules={{ required: true }}
          render={({ fieldState: { invalid } }) => (
            <FormControl fullWidth className='mb-4'>
              <Typography variant='subtitle1'>Cover</Typography>
              <Typography color='textSecondary' gutterBottom>
                This image will appear at the top of your profile page, 1600x400 recommended.
              </Typography>
              <input hidden type='file' id='cover' accept='image/*' onChange={handleChangeCover} />
              <UploadLabel
                {...{ htmlFor: 'cover', variant: 'rounded', image: cover }}
                {...{ width: '100%', height: 180, loading: coverLoading, error: invalid }}
              />
            </FormControl>
          )}
        />

        <Controller
          name='username'
          defaultValue=''
          control={control}
          rules={{
            validate: {
              required: (value) => value.trim() !== '' || 'Username cannot be empty',
              minLength: (value) => value.trim().length >= 5 || 'Username is at least 5 characters',
              maxLength: (value) => value.trim().length < 50 || 'Username is at most 50 characters',
            },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <FormControl fullWidth className='mb-4'>
              <Typography variant='subtitle1'>Username</Typography>
              <TextField {...field} error={invalid} helperText={error?.message} />
            </FormControl>
          )}
        />

        <Controller
          name='bio'
          defaultValue=''
          control={control}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth className='mb-4'>
              <Typography variant='subtitle1'>Biography</Typography>
              <TextEditor name='bio' onChange={(value: any) => onChange({ target: { value } })} />
            </FormControl>
          )}
        />

        <div className='flex justify-end'>
          <LoadingButton variant='contained' loading={isLoading} onClick={handleClickSubmit}>
            Update
          </LoadingButton>
        </div>
      </Paper>
    </Container>
  );
};

export default ProfileUpdate;
