import { Check, Close, RadioButtonUnchecked } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';

export type IStatus = 'IDLE' | 'LOADING' | 'ERROR' | 'TRYAGAIN' | 'SUCCESS';
type IStep = 'CREATE' | 'FRAGMENT' | 'APPROVE' | 'SIGN' | 'LISTING' | 'CANCEL' | 'BUY';

type StepType = {
  step: IStep;
  status: IStatus;
  onTryAgain: (args?: any) => void;
  action?: string;
  description?: string;
};

const Status = ({ status }: { status: IStatus }) => {
  if (status === 'IDLE') {
    return <RadioButtonUnchecked style={{ fontSize: 32 }} color='disabled' />;
  }
  if (status === 'LOADING' || status === 'TRYAGAIN') {
    return <CircularProgress size={28} />;
  }
  if (status === 'ERROR') {
    return <Close style={{ fontSize: 32 }} color='error' />;
  }
  if (status === 'SUCCESS') {
    return <Check style={{ fontSize: 32, color: '#89C87B' }} />;
  }
  return null;
};

const StepStatus = ({ step, status, onTryAgain, action, description }: StepType) => {
  if (!action) {
    if (step === 'CREATE') action = 'Mint item';
    if (step === 'FRAGMENT') action = 'Create';
    if (step === 'APPROVE') action = 'Approve';
    if (step === 'SIGN') action = 'Sign';
    if (step === 'LISTING') action = 'Put on market';
    if (step === 'CANCEL') action = 'Revoke sale';
    if (step === 'BUY') action = 'Make payment';
  }
  if (!description) {
    if (step === 'CREATE') description = 'Send transaction to create NFT';
    if (step === 'FRAGMENT') description = 'Split image to fragments';
    if (step === 'SIGN') description = "Sign message to verify it's you";
    if (step === 'APPROVE') description = 'Approve to spend assets on your wallet';
    if (step === 'LISTING') description = 'Listing on marketplace';
    if (step === 'CANCEL') description = 'Send transaction to revoke your listing';
    if (step === 'BUY') description = 'Send transaction to buy NFT';
  }

  return (
    <div className='flex mb-4'>
      <div className='flex items-center justify-center h-12 w-12'>
        <Status status={status} />
      </div>
      <div className='flex-1'>
        <Typography variant='h6'>{action}</Typography>
        <Typography variant='body2' color='textSecondary'>
          {description}
        </Typography>
        {(status === 'ERROR' || status === 'TRYAGAIN') && (
          <Button
            variant='outlined'
            size='small'
            disabled={status === 'TRYAGAIN'}
            onClick={() => onTryAgain(true)}
            className='mt-1'
          >
            Try again
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepStatus;
