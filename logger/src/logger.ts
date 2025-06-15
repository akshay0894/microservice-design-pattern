import winston, { stream } from "winston";
import morgan from "morgan";
import { write } from "fs";
const {timestamp, json,combine} = winston.format;

export const logger = winston.createLogger({
    level: 'http',
    format:combine(timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A',}), json()),
    transports:[new winston.transports.Console()]
});

export const morganMiddleware = morgan(function(tokens:any, req: any, res:any){
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(tokens['response-time'](req, res)),
      });
}, {
    stream:{ write: function(message:string){
        const data = JSON.parse(message);
        logger.http('incoming request', data);
    }}
})
