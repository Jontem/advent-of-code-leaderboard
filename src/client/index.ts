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
  participantContainer.appendChild(createParticipantMeta(leaderboardInfo));

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

function createParticipantMeta(member: Member) {
  const ul = document.createElement("ul");
  ul.appendChild(
    createParticipantMetaRow("Global score", member.global_score.toString())
  );
  ul.appendChild(
    createParticipantMetaRow("Divid score", member.local_score.toString())
  );

  return ul;
}

function createParticipantMetaRow(name: string, value: string) {
  const li = document.createElement("li");
  li.innerText = `${name}: ${value}`;
  return li;
}
