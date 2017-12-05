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
const data_1 = require("./data");
const Koa = require("koa");
const KoaStatic = require("koa-static");
const path = require("path");
const app = new Koa();
const clientRoot = path.resolve("../client/dist");
app.use(KoaStatic(clientRoot, { extensions: [".js"] }));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.request.path === "/api/leaderboard") {
        ctx.body = yield data_1.getLeaderBoard();
    }
    else {
        yield next();
    }
}));
app.listen(3000);
