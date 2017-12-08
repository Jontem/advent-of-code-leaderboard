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
  participantContainer.appendChild(createParticipantRepoInfo(info.github));
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

function createParticipantRepoInfo(repo: string) {
  const a = document.createElement("a");
  
  a.href = repo;
  a.innerText = "View code";
  
  return a;
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
    const releaseDate = new Date(2017, 11, parseInt(dayKey), 6, 0, 0).getTime();
    const date1 = day["1"] && new Date(new Date(day["1"].get_star_ts).getTime() - releaseDate);
    const date2 = day["2"] && new Date(new Date(day["2"].get_star_ts).getTime() - releaseDate);

    if (date1) {
      const ul = document.createElement("ul");
      const li1 = document.createElement("li");
      li1.innerText = "Part1: " + presentDate(date1); 
      ul.appendChild(li1);
      if (date2) {
        const li2 = document.createElement("li");
        li2.innerText += "Part2: " + presentDate(date2);
        ul.appendChild(li2);
      }

      container.appendChild(ul);
    }
  });

  return container;
}

function presentDate(date: Date): string {

  const countDays = date.getTime() / 864e5;
  const restDays = date.getTime() % 846e5;
  const days = Math.floor(countDays);

  const countHours = restDays / 36e5;
  const restHours = restDays % 36e5;
  const hours = Math.floor(countHours);

  const countMinutes = restHours / 6e4;
  const minutes = Math.floor(countMinutes);

  return days > 0
    ? (days + " day") + (days > 1 ? "s" : "") + (hours > 0 ? " " + hours + " hr" : "")
    : (hours > 9 ? "" : "0") + hours + ":" + (minutes > 9 ? "" : "0") + minutes;

}
