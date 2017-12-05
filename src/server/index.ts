import { LeaderBoardResponse } from "../shared/api-types";
import { getLeaderBoard } from "./data";
import * as Koa from "koa";
import * as KoaStatic from "koa-static";
import * as path from "path";

const app = new Koa();

const clientRoot = path.resolve("../client/dist");
app.use(KoaStatic(clientRoot, { extensions: [".js"] }));

app.use(async (ctx, next) => {
  if (ctx.request.path === "/api/leaderboard") {
    ctx.body = await getLeaderBoard();
  } else {
    await next();
  }
});

app.listen(3000);
