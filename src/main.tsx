import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);

/**setBets((prevBets: Bet) => {
            if (prevBets[number.toString()]) {
              prevBets[number.toString()] += selectedCoin;
              setSelectedCoin(null);
              socket.send(
                JSON.stringify({
                  type: "bet",
                  amount: selectedCoin,
                  betOnNumber: number,
                })
              );
              toast.success(`${selectedCoin} placed on ${number}`);
              return { ...prevBets };
            } else {
              setSelectedCoin(null);
              return { ...prevBets, [number.toString()]: selectedCoin };
            }
          }); */
