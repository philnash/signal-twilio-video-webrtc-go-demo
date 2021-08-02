import * as Video from "twilio-video";

const connectToRoom = async function (identity, name) {
  try {
    const { token } = await fetch("/token", {
      method: "POST",
      body: new URLSearchParams({ name, identity }),
    }).then((response) => response.json());
    const room = await Video.connect(token, {
      name: name,
      video: true,
      audio: true,
    });
    addParticipant(room.localParticipant);
    room.participants.forEach(addParticipant);
    room.on("participantConnected", addParticipant);
  } catch (error) {
    console.error("Could not connect to room");
    console.error(error);
  }
};

const addParticipant = function (participant) {
  const chat = document.querySelector(".video-chat");
  const element = document.createElement("div");
  participant.tracks.forEach((trackPublication) => {
    if (trackPublication.track) {
      const trackElement = trackPublication.track.attach();
      element.appendChild(trackElement);
    }
  });

  const trackSubscribed = function (track) {
    const trackElement = track.attach();
    element.appendChild(trackElement);
  };
  participant.on("trackSubscribed", trackSubscribed);
  chat.appendChild(element);
};

const init = async function () {
  const form = document.getElementById("connect");
  const identityInput = document.getElementById("identity");
  const nameInput = document.getElementById("name");
  form.addEventListener("submit", () => {
    const identity = identityInput.value;
    const name = nameInput.value;
    form.remove();
    connectToRoom(identity, name);
  });
};

window.addEventListener("load", init, { once: true });
