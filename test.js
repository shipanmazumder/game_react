const cryptoRandomString = require('crypto-random-string');
const fs = require('fs');
fs.writeFile('mynewfile3.txt', cryptoRandomString({length: 64, type: 'base64'}), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });