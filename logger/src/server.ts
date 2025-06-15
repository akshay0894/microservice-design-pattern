import express from 'express';
import {logger, morganMiddleware} from './logger';
import axios from 'axios';



const app = express();

app.use(morganMiddleware);

app.get('/crypto', async (req, res) => {
    try {
      const response = await axios.get(
        'https://api2.binance.com/api/v3/ticker/24hr',
      );
      const tickerPrice = response.data;
      res.json(tickerPrice);
    } catch (err) {
      logger.error(err);
      res.status(500).send('Internal server error');
    }
  });
  

app.listen('4000', (err) =>{
    if(err) {
        logger.error('failed to start server');
        return;
    }
    logger.info("server is started");
})