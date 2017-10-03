// place connection string here
// e.g. var uri = 'mongodb://khiemdc:corn@ds051334.mongolab.com:51334/cli';

var url = require('url')

var uri = process.env.MONGODB_URI || 'mongodb://localhost/nytsearch';
if (!uri) {
  throw new Error(
    'You need to provide the connection string. ' +
    'You can open "models/connection-string.js" and export it or use the "setUri" command.'
  );
}

var uriObj = url.parse(uri)
if (uriObj.protocol !== 'mongodb:') {
  throw new Error('Must be a mongodb URI')
}
if (!uriObj.host || !uriObj.path) {
  throw new Error('Improperly formatted URI')
}

module.exports = uri;

