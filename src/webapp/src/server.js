import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import configureStore from './common/configureStore';
import { Provider } from 'react-redux';

const auth = require('./api/auth');
const checkToken = require('./api/checkToken');
const cookieParser = require('cookie-parser');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const logger = require('morgan');
const fetch = require('./api/fetch');
import upload from './api/upload';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookieParser())
  .use(logger('dev'))
  .use(express.json({limit: '50mb'}))
  .use('/api/auth/facebook', auth)
  .use('/api/upload', checkToken, upload)
  .use('/api/fetch', checkToken, fetch)
  .get('/*', (req, res) => {
    const context = {};
    const store = configureStore([]);
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Blur the Background - improve foreground seperation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico">
        ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        }
        ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.1/cookieconsent.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.1/cookieconsent.min.js" data-cfasync="false"></script>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <script>         
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        </script>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
