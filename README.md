# node-lanyard
A simple Lanyard wrapper

### This library supports REST & Websocket!

## ⚠️ Attention! This library uses ES modules.

Боже, что за хуйню я высрал.....

`npm i node-lanyard`
# Examples

## Websocket
JavaScript example

```js
import { LanyardWebsocket } from "node-lanyard";

const ws = new LanyardWebsocket("226622016986415104");

ws.on("update", (data) => {
  console.log(data);
});

ws.connect();
```

## Rest
JavaScript example
```js
import { fetchUser } from "node-lanyard";

const me = await fetchUser("226622016986415104");

console.log(me);
```


## Websocket & REST has same response!
Response

```json
{
  "spotify": {
    "track_id": "0SNybMfb3uFISmnYrIt7Gs",
    "timestamps": {
      "start": 1657730216336,
      "end": 1657730400642
    },
    "song": "Liberate",
    "artist": "Slipknot",
    "album_art_url": "https://i.scdn.co/image/ab67616d0000b273baf04a1d30db6ac9de26da7d",
    "album": {
      "large_text": "Slipknot (10th Anniversary Edition)",
      "large_image": "spotify:ab67616d0000b273baf04a1d30db6ac9de26da7d"
    }
  },
  "listening_to_spotify": true,
  "kv": {
    "location": "Moscow",
    "github": "https://github.com/cramatsu"
  },
  "discord_user": {
    "username": "cramatsu",
    "public_flags": 128,
    "id": "226622016986415104",
    "discriminator": "1010",
    "bot": false,
    "avatar": "a524be5bd79c8f05d3d1e77172357465"
  },
  "discord_status": "dnd",
  "activities": [
    {
      "type": 4,
      "state": "Не человек, а двуногое бессилие.",
      "name": "Custom Status",
      "id": "custom",
      "emoji": [
        null
      ],
      "created_at": 1657728860774
    },
    {
      "type": 0,
      "timestamps": [
        null
      ],
      "state": "16:16 / 299 bytes",
      "name": "Visual Studio Code",
      "id": "23a5aec00217c0a9",
      "details": "Факаюсь с index.js",
      "created_at": 1657730323077,
      "assets": [
        null
      ],
      "application_id": "383226320970055681"
    },
    {
      "type": 2,
      "timestamps": [
        null
      ],
      "sync_id": "0SNybMfb3uFISmnYrIt7Gs",
      "state": "Slipknot",
      "session_id": "e87647d9ef8a4112bb08051e9ab2d5ff",
      "party": [
        null
      ],
      "name": "Spotify",
      "id": "spotify:1",
      "flags": 48,
      "details": "Liberate",
      "created_at": 1657730217137,
      "assets": [
        null
      ]
    },
    {
      "type": 0,
      "timestamps": [
        null
      ],
      "state": "Editing typings/index.d.ts",
      "name": "WebStorm",
      "id": "d83f973d8c10d850",
      "details": "lanyard-ts",
      "created_at": 1657730340473,
      "assets": [
        null
      ],
      "application_id": "571372925312303169"
    }
  ],
  "active_on_discord_web": false,
  "active_on_discord_mobile": false,
  "active_on_discord_desktop": true
}
```

I hope you have enjoyed everything (´｡• ᵕ •｡`) ♡

> Github: [@cramatsu](https://github.com/cramatsu)
