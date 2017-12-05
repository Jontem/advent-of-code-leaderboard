var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userInfo } from "../shared/user-info";
(() => __awaiter(this, void 0, void 0, function* () {
    const data = yield fetch("/api/leaderboard").then(res => res.json());
    Object.keys(userInfo).forEach(memberId => {
        const info = userInfo[memberId];
        const leaderboardInfo = data.members[memberId];
        console.log("hello");
        addParticipant(info, leaderboardInfo);
    });
}))();
const participantsContainer = document.getElementById("participants");
function addParticipant(info, leaderboardInfo) {
    const participantContainer = document.createElement("div");
    participantContainer.className = "participant";
    participantContainer.appendChild(createImageElement(info.image));
    participantContainer.appendChild(createParticipantTitle(info.name, leaderboardInfo.stars));
    if (participantsContainer) {
        participantsContainer.appendChild(participantContainer);
    }
}
function createImageElement(imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    return img;
}
function createParticipantTitle(name, stars) {
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    span.innerText = `${stars}*`;
    span.className = "star-count";
    h2.innerText = name + " ";
    h2.appendChild(span);
    return h2;
}
