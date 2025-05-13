import { mockApi } from '../../../api/mockApi';
import { ContactType, GetContactParams } from '../model/types';

export const contactApi = mockApi.injectEndpoints({
  endpoints: (build) => ({
    getContactAsync: build.query<ContactType, GetContactParams>({
      query: (body) => ({
        url: `proxy/contacts/${body.id}`,
        method: 'GET',
        headers: { Authorization: body.auth ?? undefined },
      }),
    }),
    patchContactAsync: build.mutation<
      ContactType,
      Partial<ContactType> & GetContactParams
    >({
      query: (body) => ({
        url: `proxy/contacts/${body.id}`,
        method: 'PATCH',
        headers: { Authorization: body.auth ?? undefined },
        body: {
          lastname: body.lastname,
          firstname: body.firstname,
          phone: body.phone,
          email: body.email,
          createdAt: body.createdAt,
          updatedAt: body.updatedAt,
        },
      }),
    }),
  }),
});

export const { useGetContactAsyncQuery, usePatchContactAsyncMutation } =
  contactApi;
