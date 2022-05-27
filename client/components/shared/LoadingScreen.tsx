import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SpinnerIcon } from '../../assets/icons';
import { AuthContext } from '../../pages/context/AuthContext';
import { getData } from '../../util/storage';

const LoadingScreen = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const _getData = async () => {
      let token = await getData('token');
      console.log('token dey? ', token);
      if (!token && !isLoggedIn) {
        router.push('/');
      }
    };
    _getData();
  }, [isLoggedIn]);
  return null;
  return (
    <div>
      <SpinnerIcon size={40} color="#444" />
    </div>
  );
};

export default LoadingScreen;
