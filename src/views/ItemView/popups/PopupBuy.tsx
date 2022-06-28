import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CloseButton } from 'components';
import { erc20Contract, marketContract, web3 } from 'contracts';
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

const PopupBuy = ({ item, onClose }: PopupProps) => {
  const { address } = useSelector(profileSelector);
  const { marketplaceAddress } = useSelector(systemSelector);

  const [approveStatus, setApproveStatus] = useState<IStatus>('IDLE');
  const [buyStatus, setBuyStatus] = useState<IStatus>('IDLE');

  const isLoading = [approveStatus, buyStatus].includes('LOADING');
  const isTryAgain = [approveStatus, buyStatus].includes('TRYAGAIN');
  const isError = [approveStatus, buyStatus].includes('ERROR');
  const isSuccess = [buyStatus].includes('SUCCESS');

  const { paymentToken, price } = item.sale!;
  const approvePrice = web3.utils.toWei(price.toString()!, 'ether');
  const isETH = paymentToken.contractAddress === '0x0000000000000000000000000000000000000000';

  const onApprove = async (isTryAgain?: boolean) => {
    try {
      setApproveStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');
      if (!isETH) {
        const allowance = await erc20Contract(paymentToken.contractAddress!)
          .methods.allowance(address, marketplaceAddress)
          .call();

        if (Number(allowance) < Number(approvePrice)) {
          await erc20Contract(paymentToken.contractAddress!)
            .methods.approve(marketplaceAddress, web3.utils.toTwosComplement(-1))
            .send({ from: address });
        }
      }

      setApproveStatus('SUCCESS');
      await onBuy();
    } catch {
      setApproveStatus('ERROR');
    }
  };

  const onBuy = async (isTryAgain?: boolean) => {
    try {
      setBuyStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');

      const saleId = web3.utils.toBN(item.sale?.id!);
      const signature = await nftService.generateBuyHashMessage({
        id: item.id,
        paymentTokenId: paymentToken.id!,
        price: approvePrice,
      });
      await marketContract(marketplaceAddress)
        .methods.matchedFixedPriceSales(
          Object.values({
            saleId: saleId.toString(),
            nft: item.nftContract,
            tokenId: item.tokenId,
            paymentToken: paymentToken.contractAddress,
            price: approvePrice,
            seller: item.owner.address,
            feeRate: 50,
          }),
          signature,
        )
        .send({
          from: address,
          value: isETH ? approvePrice : undefined,
        });

      queryClient.invalidateQueries('nftService.getItem');
      setBuyStatus('SUCCESS');
    } catch {
      setBuyStatus('ERROR');
    }
  };

  return (
    <>
      <DialogTitle>Purchase</DialogTitle>
      <DialogContent>
        <div className='flex items-end mb-4'></div>

        <StepStatus step='APPROVE' status={approveStatus} onTryAgain={() => onApprove(true)} />
        <StepStatus step='BUY' status={buyStatus} onTryAgain={() => onBuy(true)} />
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

export default PopupBuy;
