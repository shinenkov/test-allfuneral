import { createSlice } from '@reduxjs/toolkit';
import { companiesApi } from '../api';
import { type CompaniesState } from './types';
import { RootState } from '../../appStore';

const initialState: CompaniesState = {
  list: [],
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompaniesData: (state, action) => {
      state.list = action.payload;
    },
    clearCompaniesData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      companiesApi.endpoints.getCompanyAsync.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    )
  },
});

export const selectCompaniesList = (state: RootState) => state.companies.list;

export const { setCompaniesData, clearCompaniesData } = companiesSlice.actions;
