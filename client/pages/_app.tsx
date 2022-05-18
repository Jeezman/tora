import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardContextProvider } from './context/DashboardContext';

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const Layout = Component.layout || (({ children }: any) => <>{children}</>);
  return (
    <AuthContextProvider>
      <DashboardContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DashboardContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
