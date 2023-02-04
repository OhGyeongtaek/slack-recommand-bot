import { shuffle } from '../utils';
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

    if (!RECOMMAND_COMMANDS.includes(commands[0] as Commands)) return;

    const getMessageActions: Record<Commands, () => Promise<string>> = {
      $ㅇㅈㅁ: async () =>
        await this.getRestaurantText(
          Number(commands[1] ?? LIMIT_RESTAURANTS_LENGTH)
        ),

      $ㄹㄷㅇㅇ: async () =>
        await this.getPeopleText(Number(commands[1] ?? LIMIT_PEOPLE_LENGTH)),
    };

    const message = (await getMessageActions[commands[0]]?.()) ?? '';

    this.postMessage(event, message);
  }

  async getRandomRows(sheetNumber: number) {
    const rows = await this.getRows(sheetNumber);

    return shuffle<GoogleSpreadsheetRow[]>(rows);
  }

  async getRestaurantText(limit: number = LIMIT_RESTAURANTS_LENGTH) {
    const rows = await this.getRandomRows(0);

    return rows
      .slice(0, Math.min(limit, rows.length))
      .map(this.createTestaurantText)
      .join(GUIDE_LINE);
  }

  createTestaurantText(row: GoogleSpreadsheetRow) {
    return [
      `이름: ${row._rawData[0]}`,
      `별점: ${row._rawData[2]}`,
      `키워드: ${row._rawData[3]}`,
      `URL: ${row._rawData[1]}`,
    ].join('\n');
  }

  async getPeopleText(limit: number) {
    const people = await this.getRandomRows(1);
    const groupSize = Math.ceil(people.length / limit);
    const group = new Array(groupSize).fill(null);
    const restaurants = await this.getRandomRows(0);

    return group
      .map((_, idx) => {
        const strArr = [`[${idx + 1}조]`];

        strArr.push(
          people
            .slice(idx * limit, (idx + 1) * limit)
            .map((row) => row._rawData[0])
            .join(', ')
        );
        strArr.push('\n');
        strArr.push(this.createTestaurantText(restaurants[idx]));

        return strArr.join('\n');
      })
      .join(GUIDE_LINE);
  }

  async postMessage(event: OnEventMessage, message: string) {
    try {
      this.webClient.chat.postMessage({
        text: message,
        channel: event.channel,
      });
    } catch (e) {
      console.log('error >> :: ', e);
    }
  }
}

type Commands = '$ㅇㅈㅁ' | '$ㄹㄷㅇㅇ';

const LIMIT_PEOPLE_LENGTH = 3;
const LIMIT_RESTAURANTS_LENGTH = 3;

const RECOMMAND_COMMANDS: Commands[] = ['$ㅇㅈㅁ', '$ㄹㄷㅇㅇ'];
const GUIDE_LINE = '\n\n============================================\n\n';
