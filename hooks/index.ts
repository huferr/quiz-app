import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Question } from "../types";
import { useEffect, useRef, useState } from "react";

export const useGetQuestions = () => {
  const fetcher = async () => {
    try {
      const response = await api.get("/questions");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({ queryKey: ["questions"], queryFn: fetcher });
};

export const useGetSingleQuestion = () => {
  const fetcher = async () => {
    try {
      const response = await api.get<Question>("questions/single");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["useGetSingleQuestion"],
    queryFn: fetcher,
    staleTime: Infinity,
  });
};

export function useInterval(
  callback: () => void,
  delay: number | null,
  stop?: boolean
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);

    if (stop) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [delay, stop]);
}

export function useTimer(time: number, options?: { onFinish?: () => void }) {
  const [clock, setClock] = useState(time || 60);
  const [stop, setStop] = useState(false);

  useInterval(
    () => {
      setClock((secounds) => (secounds > 0 ? secounds - 1 : 0));
    },
    1000,
    stop
  );

  useEffect(() => {
    if (options && options.onFinish && clock === 0) {
      options.onFinish();
    }
  }, [clock, options?.onFinish]);

  const resetClock = (newTime = time) => {
    setClock(newTime);
    setStop(false);
  };

  const pause = () => setStop(true);

  return { clock, resetClock, pause };
}
