import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

export default app;
