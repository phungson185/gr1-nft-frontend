import { Button, Dialog, Typography } from '@mui/material';
import { ItemType } from 'models/Item';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { walletService } from 'services';
import { PopupBuy, PopupListing, PopupCancel } from 'views/ItemView/popups';

const BoxPrice = ({ item }: { item: ItemType }) => {
  const { isLoggedIn, address } = useSelector(profileSelector);

  const isOwner = isLoggedIn && address === item?.owner.address;

  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [isOpenLising, setIsOpenLising] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsOpenLising(false);
      setIsOpenCancel(false);
      setIsOpenBuy(false);
    }
  }, [isLoggedIn]);

  return (
    <div className='w-full'>
      {item.listedOnMarket ? (
        <>
          <div className='flex-1 mb-6'>
            <Typography variant='subtitle2' color='textSecondary'>
              Price
            </Typography>
            <Typography variant='subtitle1'>
              {item.sale?.price} {item.sale?.paymentToken.symbol}
            </Typography>
          </div>

          {isOwner ? (
            <Button fullWidth size='large' onClick={() => setIsOpenCancel(true)}>
              CANCEL LISTING
            </Button>
          ) : isLoggedIn ? (
            <Button fullWidth size='large' onClick={() => setIsOpenBuy(true)}>
              BUY NOW
            </Button>
          ) : (
            <Button fullWidth size='large' onClick={() => walletService.connectWallet()}>
              CONNECT WALLET
            </Button>
          )}
        </>
      ) : (
        <>
          {/* <div className='flex-1 flex items-center text-center mr-3'>
            <div className='font-black text-xl text-blue-300'>NOT FOR SALE</div>
          </div> */}

          {isLoggedIn ? (
            isOwner && (
              <Button fullWidth size='large' onClick={() => setIsOpenLising(true)}>
                PUT ON MARKET
              </Button>
            )
          ) : (
            <Button fullWidth size='large' onClick={() => walletService.connectWallet()}>
              CONNECT WALLET
            </Button>
          )}
        </>
      )}

      <Dialog open={isOpenLising} fullWidth maxWidth='xs'>
        <PopupListing item={item} onClose={() => setIsOpenLising(false)} />
      </Dialog>
      <Dialog open={isOpenCancel} fullWidth maxWidth='xs'>
        <PopupCancel item={item} onClose={() => setIsOpenCancel(false)} />
      </Dialog>
      <Dialog open={isOpenBuy} fullWidth maxWidth='xs'>
        <PopupBuy item={item} onClose={() => setIsOpenBuy(false)} />
      </Dialog>
    </div>
  );
};

export default BoxPrice;
