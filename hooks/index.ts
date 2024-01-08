import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Question } from "../types";

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
