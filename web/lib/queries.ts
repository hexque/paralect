import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from './api';
import { ROUTE_PATH } from './constants';

import { Vacancy } from '@/types';

export const useVacancies = () => {
  const {
    data: vacancies,
    error,
    isLoading
  } = useQuery({
    queryKey: ['search-vacancies'],
    retry: 1,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await api.get(ROUTE_PATH.VACANCIES);
      return data;
    },
    select: (data) => data?.data
  });

  return { vacancies, isLoading, error };
};

export const useVacancy = (id: string) => {
  const {
    data: vacancy,
    error,
    isLoading
  } = useQuery({
    queryKey: ['search-vacancy', id],
    retry: 1,
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(ROUTE_PATH.VACANCIES + `/${id}`);
      return data;
    },
    select: (data) => data?.data
  });

  return { vacancy, isLoading, error };
};

export const useCreate = () => {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationKey: ['add-vacancy'],
    mutationFn: async (formData: Vacancy) => await api.post(ROUTE_PATH.VACANCIES, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-vacancies'] });
      toast.success('The response to the vacancy was successfully added');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return { mutationCreate };
};

export const useUpdate = (id: string) => {
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation({
    mutationKey: ['update-vacancy', id],
    mutationFn: async (formData: Vacancy) =>
      await api.patch(ROUTE_PATH.VACANCIES + `/${id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-vacancies'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return { mutationUpdate };
};

export const useDelete = () => {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationKey: ['delete-vacancy'],
    mutationFn: async (id: string) => await api.delete(ROUTE_PATH.VACANCIES + `/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-vacancies'] });
      toast.success('The response to the vacancy has been successfully deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return { mutationDelete };
};
