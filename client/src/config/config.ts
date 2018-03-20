
let env = 'development';

export let settings = {
  name: 'openride-client',
  version: '0.0.1',
  env: 'dev',
	apiEndpoint: 'http://localhost:3000'
};

if (env === 'production') {
  settings.env = 'prod';
  // other production settings
}
