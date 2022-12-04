import express from 'express';
import { createServer } from 'http';
import { createEventAdapter } from '@slack/events-api';

import { SlackEventAction } from './src/actions/SlackEventAction';

// 생성한 슬랙봇에 대한 키값들
import { OnEventMessage } from './src/types/SlackTypes';
import Config from './src/config/tokens.json';

const app = express();

const slackEvents = createEventAdapter(Config.SLACK_SIGNING_SECRET);

const actions = new SlackEventAction();

app.get('/', (req, res) => {
  res.send('점심 추천 봇');
});

slackEvents.on('message', (event: OnEventMessage) => {
  actions.handleMessageEvent(event);
});

app.use('/slack/events', slackEvents.requestListener());

createServer(app).listen(80, () => {
  console.log('서버오픈');
});
