export interface OnEventMessage {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  team: string;
  blocks: Object[];
  channel: string;
  event_ts: string;
  channel_type: string;
  bot_profile?: Object;
}
