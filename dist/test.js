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
exports.initYtdlpwrap = void 0;
const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('yt-dlp');
const initYtdlpwrap = () => __awaiter(void 0, void 0, void 0, function* () {
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
            .on('progress', (progress) => console.log(progress.percent, progress.totalSize, progress.currentSpeed, progress.eta))
            .on('ytDlpEvent', (eventType, eventData) => console.log(eventType, eventData))
            .on('error', (error) => {
            reject(error);
        })
            .on('close', (event) => {
            resolve('downloaded successfully');
        });
        console.log(ytDlpEventEmitter.ytDlpProcess.pid);
    });
});
exports.initYtdlpwrap = initYtdlpwrap;
