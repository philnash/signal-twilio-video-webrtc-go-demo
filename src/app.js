// Import the Twilio Video SDK
import * as Video from "twilio-video";

// This function is called when you submit the form
const connectToRoom = async function (identity, name) {
  // Fetch the token from the Twilio Function passing the identity and room name
  // as parameters.
  const data = await fetch("/token", {
    method: "POST",
    body: new URLSearchParams({ identity, name }),
  }).then((res) => res.json());
  // Using the token that the Function returns, connect to the Video service.
  const room = await Video.connect(data.token, {
    video: true,
    audio: true,
    name: name,
  });
  // Once you are connected to the room, add the local participant to the page.
  addParticipant(room.localParticipant);
  // If the room has any other participants, add them to the page too.
  room.participants.forEach(addParticipant);
  // Wait for other participants to join, and when they do, add them to the page.
  room.on("participantConnected", addParticipant);
};

const addParticipant = function (participant) {
  // This selects an element so we can place participants on the page.
  const chat = document.querySelector(".video-chat");
  // Create a <div> for a participant as a container for their media.
  const element = document.createElement("div");
  // A function that gets a participant's track and adds it to the <div>.
  const trackSubscribed = (track) => {
    element.appendChild(track.attach());
  };
  // For each of the participant's track publications, check if the track is
  // subscribed yet. If it is, call the trackSubscribed function from above and
  // add the media from the track to the page.
  participant.tracks.forEach((trackPublication) => {
    if (trackPublication.track) {
      trackSubscribed(trackPublication.track);
    }
  });
  // Listen for tracks that haven't subscribed yet. When they do, add their
  // media to the page.
  participant.on("trackSubscribed", trackSubscribed);
  // Add the <div> to the chat container
  chat.appendChild(element);
};

// Function that loads when the page is ready
const init = async function () {
  // Get access to the form and the fields in the form.
  const form = document.getElementById("connect");
  const identityInput = document.getElementById("identity");
  const nameInput = document.getElementById("name");
  // When the form is submitted, stop the page from posting the data to the
  // server. Instead, get the identity and room name from the input fields and
  // call the `connectToRoom` function. Also, remove the form from the page.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const identity = identityInput.value;
    const name = nameInput.value;
    form.remove();
    connectToRoom(identity, name);
  });
};

window.addEventListener("load", init, { once: true });
