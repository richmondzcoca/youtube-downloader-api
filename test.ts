const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('yt-dlp');
const fs = require('fs');

export const initYtdlpwrap = async () => {
    return new Promise((resolve, reject) => {
        const ytDlpEventEmitter = ytDlpWrap
            .exec([
                'https://www.youtube.com/watch?v=sVPYIRF9RCQ',
                '--no-check-certificate',
                '--force-overwrites',
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
                var files = fs.readdirSync('./');
                resolve('downloaded successfully: ' + files);
            });
            
    
            console.log(ytDlpEventEmitter.ytDlpProcess.pid);
    })
}