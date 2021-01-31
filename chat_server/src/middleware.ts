import * as Express from 'express';
import * as Cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import { get_uid, check_user, find_user } from './firebase';
import { custom_request } from './interface';
import { resolvers as rootValue } from './resolvers';
import { Constant } from './constant';
import { graphql } from './schema';

let flag = 0;

const schema = buildSchema(graphql);

const set_user_info = async (
  req: custom_request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const data = await find_user(req.query.uid);

    if (data == null) {
      req.query.place = Constant.place.root;
      next();
      return;
    }

    const ret = await check_user(req.query.uid, data.rid);

    if (ret == null) {
      req.query.place = Constant.place.lounge;
    } else {
      req.query.place = Constant.place.room;
    }

    req.query.rid = data.rid as string;
    req.query.uname = data.uname as string;
    req.query.icon = String(data.icon);

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

const set_uid = async (
  req: custom_request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (req.headers.authorization == null) {
      res.sendStatus(401);
      return;
    }

    req.query.uid = await get_uid(req.headers.authorization);
    return next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export const middleware = (app: Express.Application) => {
  process.env['NODE_ENV'] === 'development'
    ? app.use(Cors())
    : app.use(Cors({ origin: Constant.origin }));

  // postリクエスト使えるようにする
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));

  if (flag === 0) {
    // ---------------
    app.use(set_uid);
    app.use(set_user_info);
    // ---------------
  }

  app.use(
    '/graphql',
    graphqlHTTP(async () => {
      return {
        schema: schema,
        rootValue: await rootValue,
        graphiql: false,
      };
    })
  );

  // エラーハンドリング
  app.use(
    async (
      _: Error,
      __: Express.Request,
      res: Express.Response,
      ___: Express.NextFunction
    ) => {
      res.sendStatus(500);
    }
  );
};
