import { combineReducers } from '@reduxjs/toolkit';
import { mockApi } from '../api/mockApi';
import { companySlice } from './company/index';
import { contactSlice } from './contact/index';

export const rootReducer = combineReducers({
  [mockApi.reducerPath]: mockApi.reducer,
  [companySlice.name]: companySlice.reducer,
  [contactSlice.name]: contactSlice.reducer,
});
