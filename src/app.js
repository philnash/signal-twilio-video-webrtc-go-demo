import * as Video from "twilio-video";

const connectToRoom = async function (identity, name) {
  // Fetch the token and then connect to the room
  const data = await fetch("/token", {
    method: "POST",
    body: new URLSearchParams({ identity, name }),
  }).then((res) => res.json());
  const room = await Video.connect(data.token, {
    video: true,
    audio: true,
    name: name,
  });
  addParticipant(room.localParticipant);
  room.participants.forEach(addParticipant);
  room.on("participantConnected", addParticipant);
};

const addParticipant = function (participant) {
  const chat = document.querySelector(".video-chat");
  const element = document.createElement("div");
  // Get participant tracks here and add them to the div.
  const trackSubscribed = (track) => {
    element.appendChild(track.attach());
  };
  participant.tracks.forEach((trackPublication) => {
    if (trackPublication.track) {
      trackSubscribed(trackPublication.track);
    }
  });
  participant.on("trackSubscribed", trackSubscribed);
  chat.appendChild(element);
};

const init = async function () {
  const form = document.getElementById("connect");
  const identityInput = document.getElementById("identity");
  const nameInput = document.getElementById("name");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const identity = identityInput.value;
    const name = nameInput.value;
    form.remove();
    connectToRoom(identity, name);
  });
};

window.addEventListener("load", init, { once: true });
