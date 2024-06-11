import 'reflect-metadata';

import express from 'express';

import { zottoResource } from './zotto-example';

// import NotZottoResourceRouter from './not-zotto-example';
const app = express();

app.use(express.json());
// app.use(NotZottoResourceRouter);
app.use(zottoResource.getRouter());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
