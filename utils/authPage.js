import fetch from 'isomorphic-unfetch';
import { Router } from 'next/router';

export default async function authPage(url,ctx){
    const cookie = ctx.req?.headers.cookie;
    const resp = await fetch(url,{
        headers: {
            cookie :cookie
        }
    });

    if(resp.status === 401 && !ctx.req){
        Router.replace('http://localhost:3000/login');
        return {};
    }
    if(resp.status === 401 && ctx.req){
        ctx.res?.writeHead(302,{
            Location: "http://localhost:3000/login"
        });
        ctx.res?.end();
        return;
    }
}