import express from 'express';
import dotenv from 'dotenv';
import { checkConnection } from './config/db';
import { equipoRouter } from './routes/equipo.routes';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Le decimos al servidor que la carpeta "public" es nuestra página web
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({ estado: 'Servidor CoreKeeper Operativo' });
});

app.use('/api/equipos', equipoRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  await checkConnection();
});