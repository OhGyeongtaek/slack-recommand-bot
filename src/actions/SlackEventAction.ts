import { OnEventMessage } from './../types/SlackTypes.d';
import { WebClient } from '@slack/web-api';

// 생성한 슬랙봇에 대한 키값들
import GoogleSpreadController from './GoogleSpreadController';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

export class SlackEventAction extends GoogleSpreadController {
  private webClient;

  constructor() {
    try {
      super();
      this.webClient = new WebClient(
        process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN
      );
    } catch (e) {
      console.log('error >> :: ', e);
    }
  }

  async handleMessageEvent(event: OnEventMessage) {
    if (!event.text) return;

    const commands = event.text.split(':');

    if (!RECOMMAND_COMMANDS.includes(commands[0])) return;

    const limit = Number(commands[1] ?? LIMIT_LENGTH);
    const restaurants = await this.getRandomRestaurants(
      isNaN(limit) ? LIMIT_LENGTH : limit
    );

    this.postMessage(event, restaurants);
  }

  postMessage(event: OnEventMessage, restaurants: GoogleSpreadsheetRow[]) {
    try {
      this.webClient.chat.postMessage({
        text: this.getRestaurantText(restaurants),
        channel: event.channel,
      });
    } catch (e) {
      console.log('error >> :: ', e);
    }
  }

  async getRandomRestaurants(limit: number = LIMIT_LENGTH) {
    const rows = await this.getRows();
    const selectedIndex = [];

    while (selectedIndex.length < limit) {
      const idx = Math.floor(Math.random() * 100) % rows.length;

      if (rows[idx] && !selectedIndex.includes(idx)) {
        selectedIndex.push(idx);
      }
    }

    return selectedIndex.map((idx) => rows[idx]);
  }

  getRestaurantText(rows: GoogleSpreadsheetRow[]) {
    return rows
      .map((row) =>
        [
          `이름: ${row._rawData[0]}`,
          `별점: ${row._rawData[2]}`,
          `키워드: ${row._rawData[3]}`,
          `URL: ${row._rawData[1]}`,
        ].join('\n')
      )
      .join(GUIDE_LINE);
  }
}

const LIMIT_LENGTH = 3;
const RECOMMAND_COMMANDS = ['$랜덤', '$ㅇㅈㅁ'];
const GUIDE_LINE = '\n\n============================================\n\n';
