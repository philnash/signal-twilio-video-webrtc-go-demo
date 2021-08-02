const Twilio = require("twilio");
const {
  jwt: { AccessToken },
} = Twilio;
const { VideoGrant } = AccessToken;

async function getRoom(client, name) {
  try {
    return await client.video.rooms(name).fetch();
  } catch (error) {
    return await client.video.rooms.create({ type: "go", uniqueName: name });
  }
}

exports.handler = async function (context, event, callback) {
  const { name, identity } = event;
  const client = context.getTwilioClient();
  const room = await getRoom(client, name);
  console.log(event);
  const accessToken = new AccessToken(
    context.ACCOUNT_SID,
    context.API_KEY,
    context.API_SECRET,
    { identity }
  );
  const videoGrant = new VideoGrant({ name: room.name });
  accessToken.addGrant(videoGrant);
  callback(null, { token: accessToken.toJwt() });
};
