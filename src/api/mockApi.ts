import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const mockApi = createApi({
  reducerPath: 'mock',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
