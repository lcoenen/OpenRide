import * as bunyan from 'bunyan';
import * as stream from 'stream';

let infoStream = new stream.Writable();
infoStream.writable = true;

infoStream.write = (info: any): boolean => {

  console.log(JSON.parse(info).msg);
  return true;
};

export let logger = bunyan.createLogger({
  name: 'openride',
  streams: [
    {
      level: 'info',
      stream: infoStream
    },
    {
      level: 'error',
      path: `error.log`
		},
		{
			level: 'trace',
			path: 'debug.log'
		}
  ]
});
