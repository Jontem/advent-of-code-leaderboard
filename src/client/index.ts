import { LeaderBoardResponse, Member } from "../shared/api-types";
import { userInfo } from "../shared/user-info";
import { UserInfo } from "../shared/types";
(async () => {
  const data: LeaderBoardResponse = await fetch("/api/leaderboard").then(res =>
    res.json()
  );

  Object.keys(userInfo).forEach(memberId => {
    const info = userInfo[memberId];
    const leaderboardInfo = data.members[memberId];
    console.log("hello");
    addParticipant(info, leaderboardInfo);
  });
})();

const participantsContainer = document.getElementById("participants");

function addParticipant(info: UserInfo, leaderboardInfo: Member) {
  const participantContainer = document.createElement("div");
  participantContainer.className = "participant";
  participantContainer.appendChild(createImageElement(info.image));
  participantContainer.appendChild(
    createParticipantTitle(info.name, leaderboardInfo.stars)
  );

  if (participantsContainer) {
    participantsContainer.appendChild(participantContainer);
  }
}

function createImageElement(imgSrc: string) {
  const img = document.createElement("img");
  img.src = imgSrc;

  return img;
}

function createParticipantTitle(name: string, stars: number) {
  const h2 = document.createElement("h2");

  const span = document.createElement("span");
  span.innerText = `${stars}*`;
  span.className = "star-count";
  h2.innerText = name + " ";
  h2.appendChild(span);

  return h2;
}
