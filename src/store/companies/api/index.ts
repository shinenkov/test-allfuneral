import { mockApi } from '../../../api/mockApi';
import { CompanyType, GetCompanyParams } from '../model/types';

export const companiesApi = mockApi.injectEndpoints({
  endpoints: (build) => ({
    getCompanyAsync: build.query<CompanyType[], GetCompanyParams>({
      query: (body) => ({
        url: `proxy/companies/${body.id}`,
        method: 'GET',
        headers: {"Authorization": body.auth ?? undefined }
      }),
    }),
  }),
});

export const { useGetCompanyAsyncQuery } = companiesApi;
