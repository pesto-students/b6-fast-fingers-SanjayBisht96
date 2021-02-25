import React from 'react';
import Head from 'next/head';

export default function Header(){

    return(
        <React.Fragment>
            <Head>
            <link rel="icon" href="/assets/keyboard.png" />
                <title>Fast Fingers</title>
            </Head>
        </React.Fragment>
    );

}