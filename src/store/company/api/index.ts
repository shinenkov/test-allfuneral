import { mockApi } from '../../../api/mockApi';
import {
  AddImageParams,
  CompanyType,
  DeleteImageParams,
  GetCompanyParams,
  PhotoType,
} from '../model/types';

export const companyApi = mockApi.injectEndpoints({
  endpoints: (build) => ({
    getCompanyAsync: build.query<CompanyType, GetCompanyParams>({
      query: (body) => ({
        url: `proxy/companies/${body.id}`,
        method: 'GET',
        headers: { Authorization: body.auth ?? undefined },
      }),
    }),
    patchCompanyAsync: build.mutation<
      CompanyType,
      Partial<CompanyType> & GetCompanyParams
    >({
      query: (body) => ({
        url: `proxy/companies/${body.id}`,
        method: 'PATCH',
        headers: { Authorization: body.auth ?? undefined },
        body: {
          ...(body.contract && {
            contract: {
              ...body.contract,
              issue_date: new Date(
                body.contract?.issue_date ?? ''
              ).toISOString(),
            },
          }),
          ...(body.businessEntity && { businessEntity: body.businessEntity }),
          ...(body.type && { type: body.type }),
          ...(body.name && { name: body.name }),
        },
      }),
    }),
    deleteCompanyAsync: build.mutation<null, GetCompanyParams>({
      query: (body) => ({
        url: `proxy/companies/${body.id}`,
        method: 'DELETE',
        headers: { Authorization: body.auth ?? undefined },
      }),
    }),
    addImageCompanyAsync: build.mutation<PhotoType, AddImageParams>({
      query: (body) => ({
        url: `proxy/companies/${body.id}/image`,
        method: 'POST',
        body: body.file,
        headers: {
          Authorization: body.auth ?? undefined,
        },
      }),
    }),
    deleteImageCompanyAsync: build.mutation<null, DeleteImageParams>({
      query: (body) => ({
        url: `proxy/companies/${body.id}/image/${body.name}`,
        method: 'DELETE',
        headers: { Authorization: body.auth ?? undefined },
      }),
    }),
  }),
});

export const {
  useGetCompanyAsyncQuery,
  useAddImageCompanyAsyncMutation,
  useDeleteCompanyAsyncMutation,
  useDeleteImageCompanyAsyncMutation,
  usePatchCompanyAsyncMutation,
} = companyApi;
