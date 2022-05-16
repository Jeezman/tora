import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from './context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
