import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const useGetQuestions = () => {
  const fetcher = async () => {
    try {
      const response = await api.get('/questions');

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({ queryKey: ['questions'], queryFn: fetcher });
};

export const useGetSingleQuestion = () => {
  const fetcher = async () => {
    try {
      const response = await api.get('/questions/single');

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({ queryKey: ['random_question'], queryFn: fetcher });
};
