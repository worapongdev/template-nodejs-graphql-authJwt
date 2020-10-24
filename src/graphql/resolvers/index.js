
'use strict';

const fs = require('fs');
const path = require('path');
const data = [];
const folderPath=path.join(__dirname);

fs
  .readdirSync(folderPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const item = require(path.join(folderPath, file));
    data.push(item.default);
  });

module.exports = data;

