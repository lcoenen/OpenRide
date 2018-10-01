import {Config} from '../types';

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'openride-server',
  version: '2.0.0',
  port: 3000,
  env: 'dev',
  mongoUrl: 'mongodb://localhost:27017',
	dbName: 'openride',
	sessionTTL: 10000
};

if (env === 'production') {
  settings.env = 'prod';
  // other production settings
}
