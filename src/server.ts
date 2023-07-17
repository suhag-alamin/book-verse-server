import mongoose from 'mongoose';
import config from './config';
import { Server } from 'http';
import app from './app';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');

    server = app.listen(config.port, () => {
      console.log(`BookVerse app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      console.log(error);
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
};

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is recived');
  if (server) {
    server.close();
  }
});
