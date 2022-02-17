import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postTasks from './routes/tasks.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const corsOptions = {
    origin: true,
    credentials: true,
  };
app.use(cors(corsOptions));
app.use('/tasks', postTasks);

const CONNECTION_URL = 'mongodb+srv://lisazhao:Cupcakelover101@cluster0.fxhc6.mongodb.net/HacktheNorth?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));