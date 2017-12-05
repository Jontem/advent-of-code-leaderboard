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
  participantContainer.appendChild(createRank(leaderboardInfo));

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

function createRank(leaderboardInfo: Member) {
  const container = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerText = "Rank";
  container.appendChild(h3);

  Object.keys(leaderboardInfo.completion_day_level).forEach(dayKey => {
    const day = leaderboardInfo.completion_day_level[dayKey];
    const h4 = document.createElement("h4");
    h4.innerText = `Day ${dayKey}`;
    container.appendChild(h4);
    const date1 = day["1"] && new Date(day["1"].get_star_ts);
    const date2 = day["2"] && new Date(day["2"].get_star_ts);

    if (date1) {
      const ul = document.createElement("ul");
      const li1 = document.createElement("li");
      li1.innerText = `Part1: ${date1.toLocaleTimeString()}`;
      ul.appendChild(li1);
      if (date2) {
        const li2 = document.createElement("li");
        li2.innerText += `Part2: ${date2.toLocaleTimeString()}`;
        ul.appendChild(li2);
      }

      container.appendChild(ul);
    }
  });

  return container;
}
