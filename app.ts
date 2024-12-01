import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// ใช้ Routes จาก index.ts
app.use('/api', routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
