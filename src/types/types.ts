export type OutgoingMesssage =
  | {
      type: "bet";
      amount: number;
      lockedAmount: number;
      balance: number;
      clientId?: string;
      betOnNumber: number;
    }
  | {
      type: "bet-undo";
      amount: number;
      lockedAmount: number;
      balance: number;
      clientId: string;
      betOnNumber: number;
    }
  | {
      type: "won";
      balance: number;
      betOnNumber: number;
      result: number;
      wonAmount: number;
    }
  | {
      type: "lost";
      balance: number;
      betOnNumber: number;
      result: number;
      lostAmount: number;
    }
  | {
      type: "game-started";
    }
  | {
      type: "bets-stopped";
    }
  | {
      type: "game-ended";
      result: number;
    }
  | {
      type: "current-state";
      gameState: GameState;
      balance: number;
      userId: string;
    }
  | {
      type: "user-data";
      balance: number;
      gameState: GameState;
    };

export type IncommingMessage =
  | {
      type: "bet";
      amount: number;
      clientId?: string;
      betOnNumber: number;
    }
  | { type: "get-user-data" }
  | { type: "start-game" }
  | { type: "end-game"; result: number }
  | { type: "stop-bets" };
export type Bet = {
  amount: number;
  userId: string;
  betOnNumber: number;
};
export enum GameState {
  CanBet,
  CantBet,
  GameOVer,
}
