import express from 'express';
import { createServer } from 'http';
import { createEventAdapter } from '@slack/events-api';

import { SlackEventAction } from './src/actions/SlackEventAction';

import dotenv from 'dotenv';
import path from 'path';

// 생성한 슬랙봇에 대한 키값들
import { OnEventMessage } from './src/types/SlackTypes';

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

const actions = new SlackEventAction();

app.get('/', (req, res) => {
  res.send('점심 추천 봇');
});

slackEvents.on('message', (event: OnEventMessage) => {
  actions.handleMessageEvent(event);
});

app.use('/slack/events', slackEvents.requestListener());

createServer(app).listen(process.env.SERVER_PORT, () => {
  console.log('서버오픈');
});
