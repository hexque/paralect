import { useQuery } from '@tanstack/react-query';

import api from './api';

export const useVacancies = () => {
  const {
    data: vacancies,
    error,
    isLoading
  } = useQuery({
    queryKey: ['search-vacancies'],
    retry: 2,
    refetchOnWindowFocus: true,
    queryFn: () => api.get('/vacancy')
  });

  return { vacancies, isLoading, error };
};
