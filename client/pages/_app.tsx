import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider, ProtectRoute } from './context/AuthContext';
import { DashboardContextProvider } from './context/DashboardContext';
import { StoreContextProvider } from './context/StoreContext';
import { CartContextProvider } from './context/CartContext';
import { socket } from './context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData, storeData } from '../util/storage';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {

    const redirectUser = async () => {
      const storeName = await getData('store');
      router.push(`/store/${storeName}`);
    };

    socket.on("paymentsuccess", (arg: any) => {
      redirectUser();
    });

  }, [router]);

  // @ts-ignore
  const Layout = Component.layout || (({ children }: any) => <>{children}</>);

  return (
    <AuthContextProvider>
      <DashboardContextProvider>
        <StoreContextProvider>
          <CartContextProvider>
            <ProtectRoute>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ProtectRoute>
          </CartContextProvider>
        </StoreContextProvider>
      </DashboardContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
