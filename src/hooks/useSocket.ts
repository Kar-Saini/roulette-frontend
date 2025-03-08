import { useEffect, useState } from "react";
const WS_URL = process.env.WS || "ws://localhost:8080";

export default function useSocket(name?: string) {
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
