'use strict';
import {gql} from 'apollo-server-express';
import fs from 'fs';
import path from 'path';
const data =[];
const folderPath=path.join(__dirname);

const linkSchema=gql`
scalar Date

type Query{
    _:Boolean
}

type Mutation{
    _:Boolean
}

type Subscription{
    _:Boolean
}
`;

data.push(linkSchema);

fs
  .readdirSync(folderPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const item = require(path.join(folderPath, file));
    data.push(item.default);
  });

  export default data;


