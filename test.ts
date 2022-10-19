const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('yt-dlp');

let controller = new AbortController();

let resetDownload = false;

let ytDlpEventEmitter: any;

export const reset = () => {
    // ytDlpEventEmitter.ytDlpProcess.killed;
    console.log("process.platform: ", process.platform);
    process.kill(getProcessID(), 'SIGINT');
    ytDlpEventEmitter = null;
}

export const getProcessID = () => {
    return ytDlpEventEmitter?.ytDlpProcess?.pid
}

export const initYtdlpwrap = async (videoId: string) => {
    return new Promise((resolve, reject) => {
        ytDlpEventEmitter = ytDlpWrap
            .exec(
                [
                    `https://www.youtube.com/watch?v=${videoId}`,
                    '--no-check-certificate',
                    '--force-overwrites',
                    '--break-on-reject',
                    // '--no-part',
                    '-f',
                    'best',
                    '-o',
                    'output.mp4',
                ],
                {
                    shell: true,
                    detached: true
                },
                controller.signal
            )
            // yt-dlp "https://www.youtube.com/watch?v=71h8MZshGSs" --no-check-certificate --force-overwrites --break-on-reject -o output.mp4 --no-part
            .on('progress', (progress: any) => {
                // console.log(
                //     progress.percent,
                //     progress.totalSize,
                //     progress.currentSpeed,
                //     progress.eta
                // )
                console.log(progress.percent, ytDlpEventEmitter?.ytDlpProcess?.pid);
            })
            // .on('ytDlpEvent', (eventType: any, eventData: any) =>
            //     console.log(eventType, eventData)
            // )
            .on('error', (error: any) => {
                reject(`Error download: ${error}`);
            })
            .on('close', (event: any) => {
                // console.log('downloaded successfully');
                ytDlpEventEmitter = null;
                resolve('downloaded successfully');
            });
    })
}