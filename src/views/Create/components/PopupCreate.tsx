import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CloseButton } from 'components';
import { minterContract } from 'contracts';
import { PopupController } from 'models/Common';
import { useRouter } from 'next/router';
import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { systemSelector } from 'reducers/systemSlice';
import { publicRoute } from 'routes';
import { nftService, queryClient } from 'services';
import { randomTokenID } from 'utils/common';
import { useQuery } from 'react-query';
import { signOnClient } from 'utils/signOnClient';
import { IStatus, StepStatus } from '.';

type PopupProps = PopupController & {
  values: any;
};

const PopupCreate = ({ values, onClose }: PopupProps) => {
  const router = useRouter();
  const { address } = useSelector(profileSelector);
  const { nftContractAddress } = useSelector(systemSelector);

  const [signStatus, setSignStatus] = useState<IStatus>('IDLE');
  const [createStatus, setCreateStatus] = useState<IStatus>('IDLE');

  const isLoading = [signStatus, createStatus].includes('LOADING');
  const isTryAgain = [signStatus, createStatus].includes('TRYAGAIN');
  const isError = [signStatus, createStatus].includes('ERROR');
  const isSuccess = [createStatus].includes('SUCCESS');

  const saved = useRef<string>();

  const onSign = async (isTryAgain?: boolean) => {
    setSignStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');
    const tokenId = randomTokenID();
    signOnClient(
      {
        userAddress: address,
        nftContractAddress,
        tokenId,
      },
      async (error: any, result: any) => {
        if (error) {
          setSignStatus('ERROR');
        } else {
          setSignStatus('SUCCESS');
          await onCreate();
        }
      },
    );
  };

  const onCreate = async (isTryAgain?: boolean) => {
    try {
      setCreateStatus(isTryAgain ? 'TRYAGAIN' : 'LOADING');
      var mint = {} as any;
      mint = await minterContract(nftContractAddress).methods.payToMint(address, values.image).send({
        from: address,
        gas: '1000000',
      });

      const minted = await nftService.mint({
        tokenId: mint.events.Transfer.returnValues.tokenId,
        name: values.name,
        description: values.description,
        image: values.image,
        transactionHash: mint.transactionHash,
        creatorAddress: mint.from,
        nftContract: nftContractAddress,
      });
      saved.current = minted.id;
      queryClient.invalidateQueries('nftService.fetchItems');
      setCreateStatus('SUCCESS');
    } catch {
      setCreateStatus('ERROR');
    }
  };

  useQuery([''], () => onSign());

  return (
    <>
      <DialogTitle>Create NFT</DialogTitle>
      <DialogContent>
        <StepStatus step='SIGN' status={signStatus} onTryAgain={() => onSign(true)} />
        <StepStatus step='CREATE' status={createStatus} onTryAgain={() => onCreate(true)} />
      </DialogContent>
      <DialogActions>
        {isSuccess ? (
          <Button fullWidth color='secondary' onClick={() => router.push(publicRoute.itemView.url(saved.current!))}>
            View item detail
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
          <Button fullWidth onClick={() => onSign()}>
            Confirm
          </Button>
        )}
      </DialogActions>
      <CloseButton onClick={onClose} disabled={isLoading || isTryAgain} />
    </>
  );
};

export default PopupCreate;
