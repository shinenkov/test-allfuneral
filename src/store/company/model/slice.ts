import { createSlice } from '@reduxjs/toolkit';
import { companyApi } from '../api';
import { type CompaniesState } from './types';
import { RootState } from '../../appStore';

const initialState: CompaniesState = {
  company: null,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, action) => {
      state.company = action.payload;
    },
    clearCompanyData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        companyApi.endpoints.getCompanyAsync.matchFulfilled,
        (state, { payload }) => {
          state.company = payload;
        }
      )
      .addMatcher(
        companyApi.endpoints.patchCompanyAsync.matchFulfilled,
        (state, { payload }) => {
          state.company = payload;
        }
      )
      .addMatcher(
        companyApi.endpoints.deleteCompanyAsync.matchFulfilled,
        (state) => {
          state.company = null;
        }
      )
      .addMatcher(
        companyApi.endpoints.addImageCompanyAsync.matchFulfilled,
        (state, { payload }) => {
          if (!state.company) return;
          const photos = state.company.photos ?? [];
          photos.push(payload);
          state.company = { ...state.company, photos };
        }
      )
      .addMatcher(
        companyApi.endpoints.deleteImageCompanyAsync.matchFulfilled,
        (state, { meta }) => {
          if (!state.company) return;
          const name = meta.arg.originalArgs.name;
          const newPhotos = state.company?.photos?.filter(
            (photo) => photo.name !== name
          );
          state.company = { ...state.company, photos: newPhotos ?? [] };
        }
      );
  },
});

export const selectCompany = (state: RootState) => state.company.company;

export const { setCompanyData, clearCompanyData } = companySlice.actions;
