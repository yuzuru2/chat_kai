import * as Express from 'express';
import { middleware } from './middleware';

const app = Express();
middleware(app);
app.listen(process.env.PORT || 4000);

export default app;

console.log('start');
