import { useQuery } from 'react-query';
import { AppHeader } from 'containers';
import { default as jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from 'reducers/profileSlice';
import { saveSystem } from 'reducers/systemSlice';
import { systemService, walletService } from 'services';

const Controller = ({ children }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')!);
      jwtDecode(profile.accessToken);
      dispatch(signIn(profile));
      walletService.connectProvider();
    } catch {
      dispatch(signOut());
    }
  }, [dispatch]);

  const { isSuccess } = useQuery(['fetchConfig'], () => systemService.fetchConfig(), {
    onSuccess: (data) => {
      dispatch(saveSystem(data))
    }
  });

  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
};

export default Controller;
