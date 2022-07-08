import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { InputNumber, Spinner } from 'components';
import { useRequiredLogin } from 'hooks';
import { ItemType } from 'models/Item';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { fileService, systemService } from 'services';
import { getBase64, merge } from 'utils/common';
import { CardItem } from 'views/Cards';
import { PopupCreate } from './components';

const Create = () => {
  useRequiredLogin();

  const [open, setOpen] = useState(false);

  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const { control, handleSubmit, clearErrors, setValue, watch } = useForm();
  const values = watch();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    getBase64(file, setImage);

    const formData = new FormData();
    formData.append('image', file as Blob);

    setImageLoading(true);
    fileService
      .uploadFile(formData)
      .then((url) => {
        setValue('image', url?.data?.data);
        clearErrors('image');
      })
      .finally(() => {
        setImageLoading(false);
      });
  };

  const handleResetFile = () => {
    setImage(undefined);
    setValue('image', '');
  };

  const handleClickSubmit = () => {
    handleSubmit(() => {
      setOpen(true);
    })();
  };

  return (
    <Container maxWidth='lg' className='py-20'>
      <Typography variant='h4' className='mb-4'>
        Create Collectible Item
      </Typography>
      <div className='flex items-start gap-10'>
        <Paper className='flex-1 p-6'>
          <Controller
            name='image'
            defaultValue=''
            control={control}
            rules={{ required: true }}
            render={({ fieldState: { invalid } }) => (
              <FormControl fullWidth className='mb-4'>
                <Typography variant='subtitle1'>Upload Image</Typography>
                <input hidden type='file' id='image' accept='image/*' onChange={handleChangeFile} />
                <Spinner spinning={imageLoading}>
                  <label
                    htmlFor='image'
                    className={merge(
                      'relative border-2 border-dashed rounded-lg p-4 cursor-pointer block',
                      'bg-slate-50  hover:border-secondary-main/75',
                      { 'border-red-400': invalid },
                    )}
                  >
                    <div className='flex items-center justify-center h-[200px]'>
                      {image ? (
                        <>
                          <img src={image} className='h-full' />
                          <IconButton color='info' className='absolute -top-2 -right-2' onClick={handleResetFile}>
                            <Close />
                          </IconButton>
                        </>
                      ) : (
                        <img src={require('assets/images/placeholder_16_9.png').default.src} className='h-full' />
                      )}
                    </div>
                  </label>
                </Spinner>
              </FormControl>
            )}
          />

          <Controller
            name='name'
            defaultValue=''
            control={control}
            rules={{
              validate: {
                required: (value) => value.trim() !== '' || 'Name cannot be empty',
                minLength: (value) => value.trim().length >= 5 || 'Name is at least 5 characters',
                maxLength: (value) => value.trim().length < 50 || 'Name is at most 50 characters',
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <FormControl fullWidth className='mb-4'>
                <Typography variant='subtitle1'>Item Name</Typography>
                <TextField {...field} error={invalid} helperText={error?.message} />
              </FormControl>
            )}
          />

          <Controller
            name='description'
            defaultValue=''
            control={control}
            rules={{
              validate: {
                required: (value) => value.trim() !== '' || 'Description cannot be empty',
                minLength: (value) => value.trim().length >= 5 || 'Description is at least 5 characters',
                maxLength: (value) => value.trim().length < 500 || 'Description is at most 500 characters',
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <FormControl fullWidth className='mb-4'>
                <Typography variant='subtitle1'>Description</Typography>
                <TextField {...field} multiline rows={5} error={invalid} helperText={error?.message} />
              </FormControl>
            )}
          />

          <div className='flex justify-end'>
            <LoadingButton variant='contained' size='large' onClick={handleClickSubmit}>
              Create Item
            </LoadingButton>
          </div>
        </Paper>
        <div className='sticky top-[80px]'>
          <CardItem item={values as ItemType} />
          {/* <Controller
            name='numberOfCopies'
            defaultValue={1}
            control={control}
            rules={{ required: true, min: 1 }}
            render={({ field, fieldState: { invalid } }) => (
              <FormControl className='mt-6'>
                <TextField
                  {...field}
                  error={invalid}
                  InputProps={{
                    inputComponent: InputNumber as any,
                    startAdornment: <span className='text-black/60 whitespace-nowrap'>Number of Copies:</span>,
                    inputProps: {
                      maxLength: 7,
                      className: 'text-right',
                      thousandSeparator: false,
                    },
                  }}
                  style={{ width: 320 }}
                />
              </FormControl>
            )}
          /> */}
        </div>
      </div>

      <Dialog open={open} fullWidth maxWidth='xs'>
        <PopupCreate values={values} onClose={() => setOpen(false)} />
      </Dialog>
    </Container>
  );
};

export default Create;
