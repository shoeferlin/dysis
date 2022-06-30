import { Request } from 'express';
import {Query, Params} from 'express-serve-static-core';

export interface TypedRequest<Q extends Query, B> extends Request {
  body: B,
  query: Q
}