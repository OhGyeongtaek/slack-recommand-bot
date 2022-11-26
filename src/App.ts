import express from 'express';
import { createServer } from 'http';
import { createEventAdapter } from '@slack/events-api';

import { SlackEventAction } from './actions/SlackEventAction';

import dotenv from 'dotenv';
import path from 'path';

// 생성한 슬랙봇에 대한 키값들
import { OnEventMessage } from './types/SlackTypes';
import AuthJson from './config/google_sheet_key.json';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('SLACK_SIGNING_SECRET >> ', process.env.SLACK_SIGNING_SECRET);

console.log(AuthJson);

// const app = express();

// const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

// const actions = new SlackEventAction();

// app.get('/', (req, res) => {
//   res.send('점심 추천 봇');
// });

// slackEvents.on('message', (event: OnEventMessage) => {
//   actions.handleMessageEvent(event);
// });

// app.use('/slack/events', slackEvents.requestListener());

// createServer(app).listen(80, () => {
//   console.log('서버오픈');
// });
