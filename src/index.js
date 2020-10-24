import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer,AuthenticationError} from 'apollo-server-express';
import {getToken,verifyToken} from './auth';

dotenv.config();

const app=express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

import authRoute from './routes/auth.routes';
import userRoute from './routes/user.routes';

authRoute(app);
userRoute(app);

import schemaV2 from './graphql/schema';
import resolvers from './graphql/resolvers';
import models from './db/models';

const server = new ApolloServer({
    typeDefs: schemaV2,
    resolvers:resolvers,
    context:({req})=>{
      const token=getToken(req);
      let user;

      if (!token) {
        throw new AuthenticationError('you must be logged in');
      }

      verifyToken(token,(err,user)=>{
        if (err) {
          throw new AuthenticationError('Unauthorized!');
        }

        user=user;
      });

      return {models,user};
    }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
console.log('Apollo Server on http://localhost:8000/graphql');
});