import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { GameState, OutgoingMesssage } from "../types/types";
import toast from "react-hot-toast";
import RouletteNumbers, { ROULETTE_NUMBERS } from "./RouletteNumbers";
import RouletteCoins, { ROULETTE_COINS } from "./RouletteCoins";

export interface Bet {
  [key: string]: number;
}
const Main = () => {
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [bets, setBets] = useState<Bet>({});
  const { socket, isLoading } = useSocket();
  const [currentGameState, setCurrentGameState] = useState<GameState>(
    GameState.GameOVer
  );
  const [result, setResult] = useState(-1);
  const [balance, setBalance] = useState<number>(2500);
  const [totalLockedAmount, setToatalLockedAmount] = useState(0);
  console.log(bets);
  useEffect(() => {
    if (!isLoading && socket) {
      socket.onmessage = (ev) => {
        try {
          const data = ev.data;
          const parsedData: OutgoingMesssage = JSON.parse(data);

          switch (parsedData.type) {
            case "bet":
              console.log(parsedData);
              setBets((prevBets: Bet) => {
                if (prevBets[parsedData.betOnNumber.toString()]) {
                  prevBets[parsedData.betOnNumber.toString()] +=
                    parsedData.amount;
                  setBalance(parsedData.balance);
                  return { ...prevBets };
                } else {
                  setSelectedCoin(null);
                  return {
                    ...prevBets,
                    [parsedData.betOnNumber.toString()]: parsedData.amount,
                  };
                }
              });
              toast.success(
                `$${parsedData.amount} placed on number ${parsedData.betOnNumber}`
              );
              setToatalLockedAmount(parsedData.lockedAmount);
              break;
            case "bet-undo":
              console.log(parsedData);
              if (currentGameState === GameState.CantBet) {
                toast.error(
                  "Bets for this games has been stopped!!! Wait for the result"
                );
              }
              if (currentGameState === GameState.GameOVer) {
                toast.error(
                  "This game has ended!!! Wait for the admin to start new game"
                );
              }
              break;
            case "current-state":
              setCurrentGameState(parsedData.gameState);
              setBalance(parsedData.balance);
              break;
            case "game-started":
              setCurrentGameState(GameState.CanBet);
              break;
            case "bets-stopped":
              setCurrentGameState(GameState.CantBet);
              break;
            case "game-ended":
              setCurrentGameState(GameState.GameOVer);
              setResult(parsedData.result);
              setToatalLockedAmount(0);
              break;
            case "won":
              toast.success(
                `You won ${parsedData.wonAmount} on number ${parsedData.betOnNumber}`
              );
              setBalance(parsedData.balance);
              break;
            case "lost":
              toast.error(
                `You lost ${parsedData.lostAmount} on number ${parsedData.betOnNumber}`
              );
              setBalance(parsedData.balance);
              break;
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
    }
  }, [socket, isLoading]);
  if (isLoading) {
    return (
      <div className="bg-black text-white h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-green-800 h-full w-full">
      <div className="flex justify-center items-center h-full flex-col gap-y-6">
        <div className="text-white font-bold text-2xl flex gap-x-2">
          <span>Balance : ${balance}</span>
          <span>Locked Balance : ${totalLockedAmount}</span>
        </div>

        <div className="border-4 border-neutral-500 w-[770px] h-[240px] px-4 py-2 shadow-lg">
          <div className="flex justify-center items-center flex-wrap h-full py-4">
            {ROULETTE_NUMBERS.map((item, idx) => (
              <RouletteNumbers
                key={idx}
                color={item.color}
                number={idx}
                selectedCoin={selectedCoin}
                bets={bets}
                setBets={setBets}
                setSelectedCoin={setSelectedCoin}
                socket={socket as WebSocket}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-x-4">
          {ROULETTE_COINS.map((coin) => (
            <RouletteCoins
              coinValue={coin.coinValue}
              color={coin.color}
              key={coin.coinValue}
              setSelectedCoin={setSelectedCoin}
              selectedCoin={selectedCoin}
            />
          ))}
        </div>
        <div className="text-white ">
          <span className="font-semibold text-xl">Current Game state : </span>
          <span className="font-thin text-md tracking-wide">
            {currentGameState === 2 && "Game About to Begin"}
            {currentGameState === 1 && "Bets Stopped"}
            {currentGameState === 0 && "Bets Opem"}
          </span>
        </div>
        {currentGameState === GameState.GameOVer && result !== -1 && (
          <div className="text-white ">
            <span className="font-semibold text-xl">Result : {result}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
