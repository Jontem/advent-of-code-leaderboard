import { LeaderBoardResponse } from "../shared/api-types";
import * as fs from "fs";
import fetch from "node-fetch";

const fileName = "leaderboard.json";

export async function getLeaderBoard(): Promise<LeaderBoardResponse> {
  if (fs.existsSync(fileName) && !shouldForceReload()) {
    return getCacheData();
  }

  return await getFromServer();
}

function getCacheData(): LeaderBoardResponse {
  console.log("From cache");
  return JSON.parse(fs.readFileSync(fileName, "utf8"));
}

async function getFromServer(): Promise<LeaderBoardResponse> {
  console.log("From server");
  const session =
    process.env["session_cookie"] ||
    fs.readFileSync("session_cookie", "utf8").replace("\n", "");
  const data: LeaderBoardResponse = await fetch(
    "http://adventofcode.com/2017/leaderboard/private/view/127839.json",
    {
      headers: {
        Cookie: "session=" + session
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
      console.log("Return cache result");
      const cached = getCacheData();
      return cached;
    });

  await fs.writeFileSync("leaderboard.json", JSON.stringify(data));
  return data;
}

function shouldForceReload() {
  const stat = fs.statSync(fileName);
  const minutes = 2;
  var modifiedDate = new Date(stat.mtime.getTime() + minutes * 60000);

  const currentTime = new Date(Date.now());

  const forceReload = currentTime.getTime() > modifiedDate.getTime();
  return forceReload;
}
