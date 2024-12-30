import React from 'react';
import {AppProps} from 'next/app';
import DefaultSEO from '../components/seo/defaultSEO';
import PageSEO from '../components/seo/pageSEO';
import Header from '../components/nav/header';
import {compose} from 'redux';
import {store} from '../store';
import '../styles/_app.scss';

const App = ({Component, pageProps}: AppProps & {pageProps: {[key: string]: any}}) => {
  return (
    <>
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
    </>
  );
}

export default compose(store.withRedux)(App);