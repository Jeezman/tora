import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardContextProvider } from './context/DashboardContext';
import { StoreContextProvider } from './context/StoreContext';
import { CartContextProvider } from './context/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const Layout = Component.layout || (({ children }: any) => <>{children}</>);
  return (
    <AuthContextProvider>
      <DashboardContextProvider>
        <StoreContextProvider>
          <CartContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartContextProvider>
        </StoreContextProvider>
      </DashboardContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
