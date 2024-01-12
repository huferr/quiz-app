import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Question, User } from "@/types";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export const useAuth = () => useContext(AuthContext);

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

export const useGetProfile = () => {
  const { userId } = useAuth();

  const fetcher = async () => {
    try {
      const response = await api.get<{ data: User }>(`/user/${userId}`);

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["useGetProfile", userId],
    queryFn: fetcher,
    staleTime: Infinity,
    refetchOnMount: "always",
  });
};

export const useComputeUserAnswer = () => {
  const { userId } = useAuth();

  const fetcher = async ({
    value,
    type,
  }: {
    value: number;
    type: "wrong" | "correct";
  }) => {
    try {
      const response = await api.post("/questions/compute", {
        userId,
        value,
        type,
      });
      console.log(response.data, value, type);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useMutation({
    mutationKey: ["useComputeUserAnswer", userId],
    mutationFn: fetcher,
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
