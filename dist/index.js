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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = require("./test");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('TEST ONLY');
}));
app.get('/download', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.query.v;
    const title = req.query.title;
    let response;
    if (!videoId) {
        return res.status(404).send('Required parameter v as videoId');
    }
    if ((0, test_1.getProcessID)()) {
        (0, test_1.reset)();
    }
    try {
        response = yield (0, test_1.initYtdlpwrap)(videoId);
        // console.log(response);
    }
    catch (error) {
        return res.status(404).send(error);
    }
    // res.download('output.mp4');
    res.json({
        status: 'success'
    });
}));
app.get('/reset', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const processID = (0, test_1.getProcessID)();
    if ((0, test_1.getProcessID)()) {
        (0, test_1.reset)();
    }
    res.send('Download has been reset with ProcessID: ' + processID);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
