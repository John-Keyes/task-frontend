import React from 'react';
import {AppProps} from 'next/app';
import DefaultSEO from 'src/components/seo/defaultSEO';
import PageSEO from 'src/components/seo/pageSEO';
import Header from 'src/components/nav/header';
import '../styles/_app.scss';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { tasksApiSlice } from 'src/store/tasks/apiSlice';

const App = ({Component, pageProps}: AppProps & {pageProps: {[key: string]: any}}) => {
  return (
    <ApiProvider api={tasksApiSlice}>
      <DefaultSEO/>

      <PageSEO
        title={pageProps.pageTitle || undefined}
        description={pageProps.pageDescription || undefined}
        thumbnail={pageProps.pageSocialImage || undefined}
      />

      <div className="fit-width fit-height">
        <Header/>
        <Component {...pageProps} />
      </div>
    </ApiProvider>
  );
}

export default App;