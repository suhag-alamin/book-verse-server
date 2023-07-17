import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';

const app: Application = express();

app.use(cors());

// parser

app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   res.send({
//     message: 'hello world',
//   });
// });

export default app;
