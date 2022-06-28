import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CloseButton } from 'components';
import { marketContract, web3 } from 'contracts';
import { PopupController } from 'models/Common';
import { ItemType } from 'models/Item';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { systemSelector } from 'reducers/systemSlice';
import { nftService, queryClient } from 'services';
import { IStatus, StepStatus } from 'views/Create/components';

type PopupProps = PopupController & {
  item: ItemType;
};

const PopupCancel = ({ item, onClose }: PopupProps) => {
  const { address } = useSelector(profileSelector);
  const { marketplaceAddress } = useSelector(systemSelector);

  const [cancelStatus, setCancelStatus] = useState<IStatus>('IDLE');

  const isLoading = [cancelStatus].includes('LOADING');
  const isTryAgain = [cancelStatus].includes('TRYAGAIN');
  const isError = [cancelStatus].includes('ERROR');
  const isSuccess = [cancelStatus].includes('SUCCESS');

  const onCancel = async (isTryAgain?: boolean) => {
    try {
      setCancelStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');

      const saleId = web3.utils.toBN(item.sale?.id!);
      const signature = await nftService.generateCancelHashMessage({ id: item.id });
      await marketContract(marketplaceAddress).methods.cancelSale(saleId, signature).send({ from: address });

      await nftService.removeSale({ id: item.id });

      queryClient.invalidateQueries('nftService.getItem');
      setCancelStatus('SUCCESS');
    } catch {
      setCancelStatus('ERROR');
    }
  };

  return (
    <>
      <DialogTitle>Cancel your listing</DialogTitle>
      <DialogContent>
        <StepStatus step='CANCEL' status={cancelStatus} onTryAgain={() => onCancel(true)} />
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
          <Button fullWidth onClick={() => onCancel()}>
            Confirm
          </Button>
        )}
      </DialogActions>
      <CloseButton onClick={onClose} disabled={isLoading || isTryAgain} />
    </>
  );
};

export default PopupCancel;
