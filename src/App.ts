import express from 'express';
import { createServer } from 'http';
import { createEventAdapter } from '@slack/events-api';

import { SlackEventAction } from './actions/SlackEventAction';

// 생성한 슬랙봇에 대한 키값들
import CONFIG from './config/bot.json';
import { OnEventMessage } from './types/SlackTypes';

const app = express();

const slackEvents = createEventAdapter(CONFIG.SIGNING_SECRET);

const actions = new SlackEventAction();

console.log(
  'BOT_USER_OAUTH_ACCESS_TOKEN :: ',
  CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN
);

slackEvents.on('message', (event: OnEventMessage) => {
  console.log(event);

  actions.handleMessageEvent(event);
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/slack/events', slackEvents.requestListener());
// 메지지 이벤트 엔드포인트를 express 에 등록하기

// express 웹 서버 실행
createServer(app).listen(80, () => {
  console.log('서버오픈');
});
