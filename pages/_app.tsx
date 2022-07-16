import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AppTheme } from 'containers';
import NextProgress from 'next-progress';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'styles/App.scss';
import 'tailwindcss/tailwind.css';

type EmotionAppProps = AppProps & {
  emotionCache: EmotionCache;
};

const App = ({ Component, emotionCache = createCache({ key: 'css' }), pageProps }: EmotionAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Gr1 | A social network for NFTs</title>

        <meta property='og:type' content='website' />
        <meta property='og:title' content='Gr1 | A social network for NFTs' key='title' />
        <meta property='og:url' content='/' />
      </Head>
      <AppTheme>
        <CssBaseline />
        <Component {...pageProps} />
        <NextProgress delay={300} options={{ showSpinner: false }} />
      </AppTheme>
    </CacheProvider>
  );
};

export default App;
