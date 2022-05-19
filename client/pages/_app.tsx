import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardContextProvider } from './context/DashboardContext';
import { StoreContextProvider } from './context/StoreContext';

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const Layout = Component.layout || (({ children }: any) => <>{children}</>);
  return (
    <AuthContextProvider>
      <DashboardContextProvider>
        <StoreContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreContextProvider>
      </DashboardContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
