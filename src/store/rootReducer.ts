import { combineReducers } from '@reduxjs/toolkit';
import { mockApi } from '../api/mockApi';
import { companiesSlice } from './companies/index';

export const rootReducer = combineReducers({
  [mockApi.reducerPath]: mockApi.reducer,
  [companiesSlice.name]: companiesSlice.reducer,
});
