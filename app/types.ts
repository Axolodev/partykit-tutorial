export type Poll = {
  title: string;
  options: string[];
  votes?: number[];
};

export enum SocketMessageType {
  vote,
  delete,
}

type VoteMessage = {
  type: SocketMessageType.vote;
  option: number;
};

type DeleteMessage = {
  type: SocketMessageType.delete;
};

export type SocketMessage = VoteMessage | DeleteMessage;
