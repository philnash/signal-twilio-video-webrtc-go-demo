# Getting started with Twilio Video WebRTC Go

This repo is an example project to show the least amount of code you need to set up a Twilio Video WebRTC Go room between two participants. It accompanies the [SIGNAL 2021 session on Twilio WebRTC Go](https://signal.twilio.com/sessions/648027).

Twilio WebRTC Go is a free service that allows you to build a custom one-to-one video chat application into your website or native application. In Twilio WebRTC Go rooms participants can chat for free. WebRTC go allows [up to 500 concurrent participants (250 rooms with 2 participants per room) and unlimited TURN usage](https://www.twilio.com/blog/video-free-webrtc-go-one-year-update).

If you outgrow Twilio WebRTC Go, you can upgrade your room without changing the code as the SDK is the same.

* [How to run this application](#how-to-run-this-application)
  * [Deploy](#deploy)
* [How it works](#how-it-works)
  * [Functions](#functions)
  * [Static Assets](#static-assets)
* [Find out more](#find-out-more)

## How to run this application

You will need Node.js 12 and a [free Twilio account](https://www.twilio.com/try-twilio) to run this application.

Clone the source code from GitHub:

```
git clone https://github.com/philnash/signal-twilio-video-webrtc-go-demo.git
cd signal-twilio-video-webrtc-go-demo
```

Install the dependencies:

```
npm install
```

Copy the `.env.example` file to `.env`:

```
cp .env.example
```

Fill in the `.env` file with your Twilio Account SID and Auth Token, found on your [Twilio console dashboard](https://console.twilio.com/), and an API Key and Secret, which you can create in the [API Keys section](https://console.twilio.com/us1/account/keys-credentials/api-keys?frameUrl=%2Fconsole%2Fproject%2Fapi-keys%3Fx-target-region%3Dus1) of the console.

Run the application with:

```
npm start
```

Open `localhost:3000/index.html` and enter your name and a room name. Submit and you are in your own Twilio Video WebRTC Go room.

### Deploy

You can deploy this application to Twilio Functions. Just run:

```
npm run deploy
```

## How it works

This is a Twilio Functions application made up of static assets and JavaScript Functions.

### Functions

There is a Function called [`token.js`](./functions/token.js) that creates a [Twilio Video access token](https://www.twilio.com/docs/video/tutorials/user-identity-access-tokens) for a [WebRTC Go room](https://www.twilio.com/docs/video/tutorials/understanding-video-rooms).

### Static Assets
In the [`src`](./src) directory there is an [`index.html`](./src/index.html) which is set up for you to enter a username and room name. There is a stylesheet [`app.css`](./src/app.css) to give the page a little style and an [`app.js`](./src/app.js) which powers the Video chat.

In [`app.js`](./src/app.js) the code does the following:

* Intercept the form submission
* Make a request to the `/token` endpoint to retrieve a token for the username and room
* Use the token with the [Twilio Video JS SDK](https://www.twilio.com/docs/video/javascript) to connect to the room
* Once the room is connected show the local participant's video on the page
* Listens to the room for other participants to join and when they do add their media to the page

Check the [source code](./src/app.js) for commented code to show you what is being done.

## Find out more

Check out the following to find out more about building Twilio Video WebRTC Go applications:

* [Understand Twilio Video WebRTC Go Rooms](https://www.twilio.com/docs/video/tutorials/understanding-video-rooms#video-webrtc-go-rooms)
* [Build a Free 1:1 Video Chat Application with Twilio WebRTC Go and JavaScript](https://www.twilio.com/blog/build-free-one-on-one-video-chat-webrtc-go-javascript)
* [Run the fully featured Twilio Video React application](https://github.com/twilio/twilio-video-app-react)
* [Other tutorials and announcements about Twilio Video on the Twilio Blog](https://www.twilio.com/blog/tag/video)

We can't wait to see what you build with Twilio Video!