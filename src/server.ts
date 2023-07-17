/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import config from './config';
// import { Server } from 'http';
import app from './app';

// eslint-disable-next-line no-unused-vars
// let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');

    app.listen(config.port, () => {
      console.log(`BookVerse app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
