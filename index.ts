import express, { Express, Request, Response } from 'express';
import { initYtdlpwrap } from './test';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    res.send('TEST ONLY');
})

app.get('/test', async (req: Request, res: Response) => {
    let response: string | unknown;
    try {
        response = await initYtdlpwrap();
    } catch (error) {
        response = error;
    }
    res.json(await response);
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})