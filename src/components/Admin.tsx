import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { GameState, OutgoingMesssage } from "../types/types";
import toast from "react-hot-toast";
const ADMIN_NAME = "KARTIK";
const Admin = () => {
  const [result, setResult] = useState(-1);
  const { socket, isLoading } = useSocket("KARTIK");
  const [currentGameState, setCurrentGameState] = useState<GameState>(
    GameState.GameOVer
  );

  useEffect(() => {
    if (!isLoading && socket) {
      socket.onmessage = (e) => {
        const data = e.data;
        const parsedData: OutgoingMesssage = JSON.parse(data);
        switch (parsedData.type) {
          case "game-started":
            setCurrentGameState(GameState.CanBet);
            break;
          case "bets-stopped":
            setCurrentGameState(GameState.CantBet);
            break;
          case "game-ended":
            setCurrentGameState(GameState.GameOVer);
            setResult(parsedData.result);
            break;
        }
      };
    }
  }, [socket, isLoading]);

  return (
    <div className="h-screen bg-green-800">
      <div className="flex justify-center items-center h-full flex-col gap-y-6">
        <div>
          {currentGameState === 2 && (
            <button
              className="py-2 px-4 bg-green-300 rounded-sm hover:scale-105 transition"
              onClick={() => {
                socket?.send(JSON.stringify({ type: "start-game" }));
                setResult(-1);
                console.log("event sent");
              }}
            >
              Start Game
            </button>
          )}
          {currentGameState === 1 && (
            <button
              className="py-2 px-4 bg-green-300 rounded-sm hover:scale-105 transition"
              onClick={() => {
                socket?.send(
                  JSON.stringify({ type: "end-game", result: result })
                );
              }}
            >
              End Game
            </button>
          )}
          {currentGameState === 0 && (
            <button
              className="py-2 px-4 bg-green-300 rounded-sm hover:scale-105 transition"
              onClick={() => {
                socket?.send(JSON.stringify({ type: "stop-bets" }));
              }}
            >
              Stop Bets
            </button>
          )}
        </div>
        <div className="border-4 border-neutral-500 w-[770px] h-[240px] px-4 py-2 shadow-lg">
          <div className="flex justify-center items-center flex-wrap h-full py-4">
            {ROULETTE_NUMBERS.map(
              ({ color, key }: { color: string; key: number }) => (
                <div
                  key={key}
                  className={`w-[50px] h-[50px] m-[2px] p-1 flex justify-center items-center rounded-sm ${color} 
                          hover:cursor-pointer hover:scale-110 transition`}
                  onClick={() => {
                    if (currentGameState === GameState.CantBet) {
                      if (result === -1) {
                        setResult(key);
                        toast.success(`Number ${key} selected as outcome`);
                      }
                      if (result === key) {
                        setResult(-1);
                        toast.error(`Number ${key} removed as outcome`);
                      }
                    }
                  }}
                >
                  <span
                    className={`text-white font-bold relative flex justify-center items-center`}
                  >
                    {key}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="text-white ">
          <span className="font-semibold text-xl">Current Game state : </span>
          <span className="font-thin text-md tracking-wide">
            {currentGameState === 2 && "Game Over!! Start New Game"}
            {currentGameState === 1 &&
              "Bets Stopped!! End the game to view outcome"}
            {currentGameState === 0 && "Bets are now Open"}
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

export default Admin;
function AdminInput({
  adminName,
  setAdminName,
}: {
  adminName: string;
  setAdminName: (name: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-800 gap-y-4">
      <label htmlFor="name" className="text-white text-lg font-semibold">
        Enter Admin Name
      </label>
      <input
        className=" rounded-sm p-2 outline-none text-sm"
        placeholder="Admin"
        type="text"
        name="name"
        id="name"
        value={adminName}
        onChange={(e) => setAdminName(e.target.value)}
      />
      <button
        className="text-black py-2 bg-green-400 rounded-lg px-4 text-sm
  "
      >
        Submit
      </button>
    </div>
  );
}

const ROULETTE_NUMBERS = Array.from({ length: 37 }, (_, index) => {
  let color;
  if (index === 0) {
    color = "green";
  } else if (
    [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ].includes(index)
  ) {
    color = "bg-red-700";
  } else {
    color = "bg-black";
  }

  return { key: index, color };
});
