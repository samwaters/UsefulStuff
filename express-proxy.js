/*
 * Express server that proxies all requests except those in a given path
 * Supports basic authentication, assuming PROXYUSER and PROXYPASS environment variables are set
 * Depends on express, express-http-proxy and base-64
 */
const express = require('express');
const proxy = require('express-http-proxy');
const b64 = require('base-64');
const app = express();
// The dist path, served from local
app.use('/dist/', express.static('dist'));
app.use(/^((?!dist).)*$/, proxy('http://destination:9000', {
  decorateRequest: function(req, origReq) {
    // Add authorization header if the details are set
    if(process.env.PROXYUSER && process.env.PROXYPASS) {
      req.headers['Authorization'] = 'Basic ' + b64.encode(process.env.PROXYUSER + ':' + process.env.PROXYPASS);
    }
    return req;
  },
  forwardPath: function(req, res) {
    // Path mutation happens here before sending to the proxy
    // In this case, translate requests to /api/, e.g. /list?id=5 --> /api/list?id=5
    let path = req.originalUrl;
    path = path.replace(/^\//, ''); //Remove leading /
    path = path.replace(/\/$/, ''); //Remove trailing /
    if(path == '') {
      path = 'home.php'
    }
    return '/api/' + path;
  },
  intercept: function(rsp, data, req, res, callback) {
    // Data mutation happens here before returning to the client
    data = data.toString('utf8'); //Convert buffer to string
    data = data.replace('destination:9000/api', 'localhost:8080'); //Switch out the server url
    data = data.replace('.prod.js', '.dev.js'); //Switch out prod for dev js
    callback(null, data);
  }
}));

app.listen(8080, function() {
  console.log('Server started on port 8080');
});
