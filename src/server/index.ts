import { LeaderBoardResponse } from "../shared/api-types";
import { getLeaderBoard } from "./data";

(async () => {
  const leaderboard = await getLeaderBoard();

  Object.keys(leaderboard.members).forEach(index => {
    const member = leaderboard.members[index];
    console.log(`${member.name}:`);
    console.log(`Stars: ${member.stars}`);
    console.log(`Points: ${member.local_score}`);
    console.log();
  });
})();
