import React from 'react';
import {AppProps} from 'next/app';
import DefaultSEO from 'src/components/seo/defaultSEO';
import PageSEO from 'src/components/seo/pageSEO';
import Header from 'src/components/nav/header';
import '../styles/_app.scss';
import { Provider } from 'react-redux';
import {store} from "../store";

const App = ({Component, pageProps}: AppProps & {pageProps: {[key: string]: any}}) => {
  return (
    <Provider store={store}>
      <DefaultSEO/>

      <PageSEO
        title={pageProps.pageTitle || undefined}
        description={pageProps.pageDescription || undefined}
        thumbnail={pageProps.pageSocialImage || undefined}
      />

      <main className="fit-width fit-height">
        <Header/>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default App;