import express from 'express';
import cors from 'cors';
import { routeApp } from './routes';
import { createModel } from './model/model';

const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS to allow credentials
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));

app.use(express.json());

(async () => {
  const model = await createModel();
  routeApp(app, model);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

