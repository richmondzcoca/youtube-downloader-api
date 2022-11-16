import express, { Express, Request, Response } from 'express';
import { getProcessID, initYtdlpwrap, reset } from './test';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    res.send('TEST ONLY');
})

app.get('/download', async (req: Request, res: Response) => {
    const videoId = req.query.v as string;
    let response: string | unknown;

    if(!videoId) {
        return res.status(404).send('Required parameter v as videoId');
    }

    // if(getProcessID()) {
    //     reset();
    // }
    
    try {
        response = await initYtdlpwrap(videoId);
        // console.log(response);
    } catch (error) {
        return res.status(404).send(error);
    } 
    
    res.json({
        status: 'success'
    })
})

app.get('/reset', async (req: Request, res: Response) => {
    const processID = getProcessID();
    if(getProcessID()) {
        reset();
    }

    res.send('Download has been reset with ProcessID: ' + processID);
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})