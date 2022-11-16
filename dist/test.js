"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initYtdlpwrap = exports.getProcessID = exports.reset = void 0;
const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('yt-dlp');
let controller = new AbortController();
let ytDlpEventEmitter;
const reset = () => {
    // ytDlpEventEmitter.ytDlpProcess.killed;
    // console.log("process.platform: ", process.platform);
    process.kill((0, exports.getProcessID)(), 'SIGINT');
    ytDlpEventEmitter = null;
};
exports.reset = reset;
const getProcessID = () => {
    var _a;
    return (_a = ytDlpEventEmitter === null || ytDlpEventEmitter === void 0 ? void 0 : ytDlpEventEmitter.ytDlpProcess) === null || _a === void 0 ? void 0 : _a.pid;
};
exports.getProcessID = getProcessID;
const initYtdlpwrap = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        ytDlpEventEmitter = ytDlpWrap
            .exec([
            `https://www.youtube.com/watch?v=${videoId}`,
            '--no-check-certificate',
            '--force-overwrites',
            '--break-on-reject',
            // '--no-part',
            '-f',
            'best',
            // '-o',
            // 'output.mp4',
        ], {
            shell: true,
            detached: true
        }, controller.signal)
            // yt-dlp "https://www.youtube.com/watch?v=71h8MZshGSs" --no-check-certificate --force-overwrites --break-on-reject -o output.mp4 --no-part
            .on('progress', (progress) => {
            var _a;
            // console.log(
            //     progress.percent,
            //     progress.totalSize,
            //     progress.currentSpeed,
            //     progress.eta
            // )
            console.log(progress.percent, (_a = ytDlpEventEmitter === null || ytDlpEventEmitter === void 0 ? void 0 : ytDlpEventEmitter.ytDlpProcess) === null || _a === void 0 ? void 0 : _a.pid);
        })
            // .on('ytDlpEvent', (eventType: any, eventData: any) =>
            //     console.log(eventType, eventData)
            // )
            .on('error', (error) => {
            reject(`Error download: ${error}`);
        })
            .on('close', (event) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('downloaded successfully');
            ytDlpEventEmitter = null;
            resolve('downloaded successfully');
        }));
    });
});
exports.initYtdlpwrap = initYtdlpwrap;
