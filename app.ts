import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// อนุญาตเฉพาะ Origin
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'], // ระบุ Origin ที่อนุญาต
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // ระบุ HTTP methods ที่อนุญาต
  credentials: true, // หากมีการส่ง cookie หรือ credential
}));

// ใช้ Routes จาก index.ts
app.use('/api', routes);
app.options('*', cors());

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
