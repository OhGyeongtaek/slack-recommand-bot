import { OnEventMessage } from './../types/SlackTypes.d';
import { WebClient } from '@slack/web-api';

// 생성한 슬랙봇에 대한 키값들
import CONFIG from '../config/bot.json';

export class SlackEventAction {
  private webClient;

  constructor() {
    this.webClient = new WebClient(CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN);
  }

  async handleMessageEvent(event: OnEventMessage) {
    const commands = event.text.split(' ');

    if (commands[0] === '추천') {
      this.webClient.chat.postMessage({
        text: '나는 봇이야!!!',
        channel: event.channel,
      });
    }
  }
}
