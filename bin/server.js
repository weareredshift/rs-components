/* eslint no-negated-condition:0 no-console:0 */
const path = require('path');
const project = require(path.resolve(__dirname, '../config/project.config'));
const server = require('../server/main');

if (process.env.NODE_ENV !== 'production') {
  server.listen(project.server_port);
  console.info(`Server is now running at http://localhost:${project.server_port}.`);
} else {
  const https = require('https');
  const fs = require('fs');

  const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
  const cert = fs.readFileSync(process.env.CERT_PATH, 'utf8');

  const sslOpts = {
    key: privateKey,
    cert: cert
  };

  const httpsServer = https.createServer(sslOpts, server);

  httpsServer.listen(443);

  // HTTPS redirect
  const http = require('http');
  const forceSSL = function (req, res) {
    const url = 'https://locoroll.redshiftdigital.io';
    const redirMsg = 'Redirecting to HTTPS...';
    res.writeHead(302, {
      'Location': url,
      'Content-Length': redirMsg.length,
      'Content-Type': 'text/plain'
    });

    res.end(redirMsg);
  };

  const httpServer = http.createServer(forceSSL);
  httpServer.listen(80);
}
