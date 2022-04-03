import Head from 'next/head';
import Page from './Page';
import './styles.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className='container'>
      <Head>
        <title>Plinq</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {typeof window === 'undefined' ? null : <Page/>}
    </div>
  );
};