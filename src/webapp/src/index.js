import http from 'http';
import https from 'https';
import fs from 'fs';

let app = require('./server').default;

const server = process.env.NODE_ENV === 'production' ? http.createServer(app) :
  https.createServer({
    key: fs.readFileSync(process.env.ServerPrivateKey),
    cert: fs.readFileSync(process.env.ServerCertificate)
  }, app);

let currentApp = app; 

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }
  console.log('port = ' + process.env.PORT);
  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
