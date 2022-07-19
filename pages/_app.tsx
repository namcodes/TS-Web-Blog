import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Loading from './Loading'
import Router from 'next/router'
import { useState } from 'react'
import 'nprogress/nprogress.css'
import NProgress from "nprogress";
import "font-awesome/css/font-awesome.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', ()=>{
    setLoading(true);
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', ()=>{
    setLoading(false);
    NProgress.done();
  })

  Router.events.on('beforeHistoryChange', ()=>{
    setLoading(true);
    NProgress.start();
  })

  Router.events.on('routeChangeError', ()=>{
    setLoading(true);
    NProgress.start();
  })
  return (
    <>
      {
        loading ? (
          <Loading/>
        ) : (
          <Component {...pageProps} />
        )
      }
    </>
    
  ) 
}

export default MyApp
