import fetch from "node-fetch";
import { LeaderBoardResponse } from "./api-types";
import * as fs from "fs";

(async () => {
  const leaderboard = await getData();

  Object.keys(leaderboard.members).forEach(index => {
    const member = leaderboard.members[index];
    console.log(`${member.name}: ${member.stars}`);
  });
})();

export async function getData(): Promise<LeaderBoardResponse> {
  const fileName = "leaderboard.json";

  if (fs.existsSync(fileName)) {
    console.log("From cache");
    return JSON.parse(fs.readFileSync(fileName, "utf8"));
  }

  const session = fs.readFileSync("session_cookie", "utf8").replace("\n", "");
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
      const cached = JSON.parse(fs.readFileSync(fileName, "utf8"));
      return cached;
    });

  await fs.writeFileSync("leaderboard.json", JSON.stringify(data));
  console.log("From server");
  return data;
}
