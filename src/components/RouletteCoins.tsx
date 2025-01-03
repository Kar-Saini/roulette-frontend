export const ROULETTE_COINS: { coinValue: number; color: string }[] = [
  { coinValue: 1, color: "bg-white" },
  { coinValue: 10, color: "bg-blue-500" },
  { coinValue: 100, color: "bg-gray-300" },
  { coinValue: 500, color: "bg-yellow-500" },
];

const RouletteCoins = ({
  coinValue,
  color,
  setSelectedCoin,
  selectedCoin,
}: {
  coinValue: number;
  color: string;
  selectedCoin: number | null;
  setSelectedCoin: (coinValue: number | null) => void;
}) => {
  return (
    <div
      className={`rounded-full w-[60px] h-[60px] flex justify-center items-center ${color} border-[6px]
         border-gray-500 hover:cursor-pointer hover:scale-125 transition ${
           selectedCoin === coinValue && "border-purple-800 scale-150"
         }`}
      onClick={() => {
        if (selectedCoin === coinValue) {
          setSelectedCoin(null);
        } else {
          setSelectedCoin(coinValue);
        }
      }}
    >
      <span className="font-bold text-lg">{coinValue}</span>
    </div>
  );
};
export default RouletteCoins;
