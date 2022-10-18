import express, { Express, Request, Response } from 'express';
import { initYtdlpwrap } from './test';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    res.send('TEST ONLY');
})

app.get('/test', async (req: Request, res: Response) => {
    const videoId = req.query.v as string;
    let response: string | unknown;
    try {
        response = await initYtdlpwrap(videoId);
    } catch (error) {
        response = error;
    }
    res.download('output.mp4');
    // res.json(await response);
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})