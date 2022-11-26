import { StoreItem } from './../types/StoreType.d';
import { OnEventMessage } from './../types/SlackTypes.d';
import { WebClient } from '@slack/web-api';

// 생성한 슬랙봇에 대한 키값들
import CONFIG from '../config/bot.json';
import STORE_LIST from '../config/store-list.json';

export class SlackEventAction {
  private webClient;

  constructor() {
    try {
      this.webClient = new WebClient(CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN);
    } catch (e) {
      console.log('error >> :: ', e);
    }
  }

  async handleMessageEvent(event: OnEventMessage) {
    if (event.text) {
      const commands = event.text.split(' ');

      if (commands[0] === '랜덤') {
        const store = this.getRandomStore();

        this.webClient.chat.postMessage({
          text: this.getStoreText(store),
          channel: event.channel,
        });
      }
    }
  }

  getRandomStore() {
    const storeCount = STORE_LIST.length;
    const randomNumber = Math.floor(Math.random() * 100) % storeCount;

    return STORE_LIST[randomNumber];
  }

  getStoreText(store: StoreItem) {
    return `이름: ${store.name} \n 타입: ${store.type} \n url: ${store.url} \n 키워드: ${store.keyword}`;
  }
}
