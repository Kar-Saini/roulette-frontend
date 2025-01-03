import { Bet } from "./Main";

const RouletteNumbers = ({
  socket,
  color,
  number,
  selectedCoin,

  bets,
}: {
  socket: WebSocket;
  color: string;
  number: number;
  selectedCoin: number | null;
  bets: Bet;
  setBets: (bet: Bet) => void;
  setSelectedCoin: (coinValue: number | null) => void;
}) => {
  return (
    <div
      className={`w-[50px] h-[50px] m-[2px] p-1 flex justify-center items-center rounded-sm ${color} 
        hover:cursor-pointer hover:scale-110 transition`}
      onClick={() => {
        if (selectedCoin !== null) {
          socket.send(
            JSON.stringify({
              type: "bet",
              amount: selectedCoin,
              betOnNumber: number,
            })
          );
        }
      }}
    >
      <span
        className={`text-white font-bold relative flex justify-center items-center`}
      >
        {bets[number.toString()] && (
          <span
            className="absolute z-10 w-[23px] h-[23px] rounded-full bg-white opacity-80 -right-5 -bottom-4
             text-black flex items-center justify-center  p-1 text-[0.7rem]"
          >
            {bets[number.toString()]}
          </span>
        )}
        {number}
      </span>
    </div>
  );
};

export const ROULETTE_NUMBERS = Array.from({ length: 37 }, (_, index) => {
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
export default RouletteNumbers;
