# 슬랙 점심 추천봇 (오점뭐)

![스크린샷 2022-11-27 오후 1 24 42](https://user-images.githubusercontent.com/20200820/204119349-3876e9b4-1cbc-4d0b-93b9-b7565229fee4.png)

---

## Skills

[![Typescript](https://img.shields.io/badge/Typescript-v4.8-blue.svg)](https://www.typescriptlang.org/)
[![ts-node](https://img.shields.io/badge/Ts_Node-v10.9-blue.svg)](https://www.npmjs.com/package/ts-node)

[![Node Version](https://img.shields.io/badge/Nodejs-v16.17.1-green.svg?logo=node.js&style=flat)](https://nodejs.org)
[![NPM Version](https://img.shields.io/badge/NPM-v9.1.2-green.svg?style=flat)](https://nodejs.org)
[![Exoress](https://img.shields.io/badge/Express-v4.18.1-green.svg?logo=node.js&style=flat)](https://nodejs.org)

[![Slack Web Api](https://img.shields.io/badge/Slack_Web_Api-v6.7.2-orange.svg)](https://www.npmjs.com/package/@slack/web-api)
[![Slack Events Api](https://img.shields.io/badge/Slack_Events_Api-v3.0.1-orange.svg)](https://www.npmjs.com/package/@slack/events-api)
[![Google Spreadsheet](https://img.shields.io/badge/Google_Spreadsheet-v3.3.0-orange.svg)](https://www.npmjs.com/package/google-spreadsheet)

---

# Use Slack Recommand Bot

```sh
git clone https://github.com/OhGyeongtaek/slack-recommand-bot.git
cd slack-recommand-bot
npm install
```

## Create .env

```sh
SLACK_SIGNING_SECRET=''
SLACK_BOT_USER_OAUTH_ACCESS_TOKEN=''
GOOGLE_SPREAD_SHEET_ID=''
```
입력 후 임시 저장.

키값을 가져오는 설명은 아래에 첨부

---

내용이 많이 2가지 파일로 분리했습니다.

## Documents

1. [슬랙 API연동하기](https://github.com/OhGyeongtaek/slack-recommand-bot/blob/main/docs/%EC%8A%AC%EB%9E%99%20API%20%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0.md)
2. [구글시트 연동하기](https://github.com/OhGyeongtaek/slack-recommand-bot/blob/main/docs/%EA%B5%AC%EA%B8%80%EC%8B%9C%ED%8A%B8%20%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0.md)

# 명령어

$ㅇㅈㅁ와 $랜덤은 같은 기능을 합니다. 그냥 취향에 맞게 커맨드를 변경해 주시면 됩니다.

커맨드가 정의된 파일 :: src/actions/SlackEventAction.ts(80)

```
$ㅇㅈㅁ    >> 구글시트에 있는 3개의 row를 랜덤으로 뽑아옵니다.
$ㅇㅈㅁ:1  >> 구글시트에 있는 1개의 row를 랜덤으로 뽑아옵니다.

$랜덤   >> 구글시트에 있는 3개의 row를 랜덤으로 뽑아옵니다.
$랜덤:1 >> 구글시트에 있는 1개의 row를 랜덤으로 뽑아옵니다.
```

# 레퍼런스

* [타입스크립트로 슬랙 앱(봇) 만들기 - 기초편](https://blog.gangnamunni.com/post/typescript-slack-bot/)
* [express에서 ngrok으로 외부에 서버 공개하기](https://velog.io/@nawnoes/express%EC%97%90%EC%84%9C-ngrok%EC%9C%BC%EB%A1%9C-%EC%99%B8%EB%B6%80%EC%97%90-%EC%84%9C%EB%B2%84-%EA%B3%B5%EA%B0%9C%ED%95%98%EA%B8%B0)