"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const node_fetch_1 = require("node-fetch");
const fileName = "leaderboard.json";
function getLeaderBoard() {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync(fileName) && !shouldForceReload()) {
            return getCacheData();
        }
        return yield getFromServer();
    });
}
exports.getLeaderBoard = getLeaderBoard;
function getCacheData() {
    console.log("From cache");
    return JSON.parse(fs.readFileSync(fileName, "utf8"));
}
function getFromServer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("From server");
        const session = process.env["session_cookie"] ||
            fs.readFileSync("session_cookie", "utf8").replace("\n", "");
        const data = yield node_fetch_1.default("http://adventofcode.com/2017/leaderboard/private/view/127839.json", {
            headers: {
                Cookie: "session=" + session
            }
        })
            .then(res => {
            return res.json();
        })
            .catch(err => {
            console.log(err);
            console.log("Return cache result");
            const cached = getCacheData();
            return cached;
        });
        yield fs.writeFileSync("leaderboard.json", JSON.stringify(data));
        return data;
    });
}
function shouldForceReload() {
    const stat = fs.statSync(fileName);
    const minutes = 2;
    var modifiedDate = new Date(stat.mtime.getTime() + minutes * 60000);
    const currentTime = new Date(Date.now());
    const forceReload = currentTime.getTime() > modifiedDate.getTime();
    return forceReload;
}
