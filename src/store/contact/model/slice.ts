import { createSlice } from '@reduxjs/toolkit';
import { contactApi } from '../api';
import { type ContactState } from './types';
import { RootState } from '../../appStore';

const initialState: ContactState = {
  contact: null,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactData: (state, action) => {
      state.contact = action.payload;
    },
    clearContactData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        contactApi.endpoints.getContactAsync.matchFulfilled,
        (state, { payload }) => {
          state.contact = payload;
        }
      )
      .addMatcher(
        contactApi.endpoints.patchContactAsync.matchFulfilled,
        (state, { payload }) => {
          state.contact = payload;
        }
      );
  },
});

export const selectContact = (state: RootState) => state.contact.contact;

export const { setContactData, clearContactData } = contactSlice.actions;
