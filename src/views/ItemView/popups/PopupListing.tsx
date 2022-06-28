import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { CloseButton, InputNumber } from 'components';
import { erc721Contract } from 'contracts';
import { PopupController } from 'models/Common';
import { ItemType } from 'models/Item';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { systemSelector } from 'reducers/systemSlice';
import { nftService, queryClient, systemService } from 'services';
import { IStatus, StepStatus } from 'views/Create/components';

type PopupProps = PopupController & {
  item: ItemType;
};

const PopupCreate = ({ item, onClose }: PopupProps) => {
  const { address } = useSelector(profileSelector);
  const { marketplaceAddress } = useSelector(systemSelector);

  const { control, handleSubmit, watch } = useForm();
  const values = watch();

  const [approveStatus, setApproveStatus] = useState<IStatus>('IDLE');
  const [listingStatus, setListingStatus] = useState<IStatus>('IDLE');

  const isLoading = [approveStatus, listingStatus].includes('LOADING');
  const isTryAgain = [approveStatus, listingStatus].includes('TRYAGAIN');
  const isError = [approveStatus, listingStatus].includes('ERROR');
  const isSuccess = [listingStatus].includes('SUCCESS');

  const { data: payments } = useQuery(['fetchPayments'], () => systemService.fetchPayments());

  const validateForm = async () => {
    let isValid = false;
    await handleSubmit(() => (isValid = true))();
    return isValid;
  };

  const onApprove = async (isTryAgain?: boolean) => {
    if (!(await validateForm())) return;
    try {
      setApproveStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');
      const isApprovedForAll = await erc721Contract(item.nftContract)
        .methods.isApprovedForAll(address, marketplaceAddress)
        .call();

      if (!isApprovedForAll) {
        await erc721Contract(item.nftContract)
          .methods.setApprovalForAll(marketplaceAddress, true)
          .send({ from: address });
      }
      setApproveStatus('SUCCESS');
      await onListing();
    } catch {
      setApproveStatus('ERROR');
    }
  };

  const onListing = async (isTryAgain?: boolean) => {
    if (!(await validateForm())) return;
    try {
      setListingStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');

      await nftService.createSale({
        ...values,
        id: item.id,
      });

      queryClient.invalidateQueries('nftService.getItem');
      setListingStatus('SUCCESS');
    } catch {
      setListingStatus('ERROR');
    }
  };

  return (
    <>
      <DialogTitle>Listing on marketplace</DialogTitle>
      <DialogContent>
        <div className='flex items-end mb-4'>
          <Controller
            name='price'
            defaultValue=''
            control={control}
            rules={{ required: 'Price is required' }}
            render={({ field, fieldState: { invalid, error } }) => (
              <FormControl>
                <Typography variant='subtitle1'>Price</Typography>
                <TextField
                  {...field}
                  InputProps={{
                    inputComponent: InputNumber,
                    style: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                  }}
                  disabled={isLoading || isTryAgain || isSuccess}
                  error={invalid}
                  helperText={error?.message}
                />
              </FormControl>
            )}
          />
          <Controller
            name='paymentTokenId'
            defaultValue={payments?.[0].id}
            control={control}
            render={({ field }) => (
              <FormControl>
                <TextField
                  select
                  {...field}
                  InputProps={{ style: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: 100 } }}
                  disabled={isLoading || isTryAgain || isSuccess}
                >
                  {payments?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.symbol}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}
          />
        </div>

        <StepStatus step='APPROVE' status={approveStatus} onTryAgain={() => onApprove(true)} />
        <StepStatus step='LISTING' status={listingStatus} onTryAgain={() => onListing(true)} />
      </DialogContent>
      <DialogActions>
        {isSuccess ? (
          <Button fullWidth color='secondary' onClick={onClose}>
            Close
          </Button>
        ) : isLoading || isTryAgain ? (
          <Button fullWidth color='inherit' className='loading'>
            Processing
          </Button>
        ) : isError ? (
          <Button fullWidth color='inherit'>
            Some errors have occurred
          </Button>
        ) : (
          <Button fullWidth onClick={() => onApprove()}>
            Confirm
          </Button>
        )}
      </DialogActions>
      <CloseButton onClick={onClose} disabled={isLoading || isTryAgain} />
    </>
  );
};

export default PopupCreate;
