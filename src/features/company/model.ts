import { useGetCompanyAsyncQuery } from '../../store/company';

export const useCompany = (token: string, id?: string) => {
  const { refetch } = useGetCompanyAsyncQuery({
    id: id ?? '12',
    auth: token,
  });

  return { refetch };
};
