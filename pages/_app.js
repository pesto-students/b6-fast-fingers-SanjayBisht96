import '../styles/globals.css'
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { homeUrl } from '../utils/consts';




export default class MyApp extends App {

  // componentDidMount = () => {
  //   const user = localStorage.getItem('userName');
  //   const diffLevel = localStorage.getItem('diffLevel');
  //     Router.push(homeUrl);
  // };


  render() {
    const { Component, pageProps  } = this.props;
    return (
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}

