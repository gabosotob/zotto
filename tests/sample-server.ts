import 'reflect-metadata';

import express from 'express';

import NotZottoResourceRouter from './not-zotto-example';
import { zottoResource } from './zotto-example';

const app = express();

app.use(NotZottoResourceRouter);
app.use(zottoResource.getRouter());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
