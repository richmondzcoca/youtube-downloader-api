const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('yt-dlp');

export const initYtdlpwrap = async () => {
    return new Promise((resolve, reject) => {
        const ytDlpEventEmitter = ytDlpWrap
            .exec([
                'https://www.youtube.com/watch?v=sVPYIRF9RCQ',
                '--no-check-certificate',
                '-f',
                'best',
                '-o',
                'output.mp4',
            ])
            .on('progress', (progress: any) =>
                console.log(
                    progress.percent,
                    progress.totalSize,
                    progress.currentSpeed,
                    progress.eta
                )
            )
            .on('ytDlpEvent', (eventType: any, eventData: any) =>
                console.log(eventType, eventData)
            )
            .on('error', (error: any) => {
                reject(error);
            })
            .on('close', (event: any) => {
                resolve('downloaded successfully');
            });
    
            console.log(ytDlpEventEmitter.ytDlpProcess.pid);
    })
}