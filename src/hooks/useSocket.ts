import { useEffect, useState } from "react";
const WS_URL = "wss://kar-saini.duckdns.org/roulette";

export default function useSocket(name?: string) {
  console.log(WS_URL);
  const [socket, setSocket] = useState<WebSocket>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newSocket = new WebSocket(name ? `${WS_URL}?name=${name}` : WS_URL);
    newSocket.onopen = () => {
      setIsLoading(false);
    };
    setSocket(newSocket);
  }, []);

  return { socket, isLoading };
}
