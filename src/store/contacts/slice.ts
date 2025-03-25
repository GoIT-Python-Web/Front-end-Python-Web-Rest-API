import { createSlice } from "@reduxjs/toolkit";
import { IContacts } from "../../interfaces/interfaces";
import {
  fetchContacts,
  fetchContactById,
  updateContactById,
  deleteContactById,
  fetchContactsByKeyword,
  createContact,
} from "./operations";
import { handlePending, handleRejected } from "../init";

export interface ContactsState {
  contacts: IContacts[] | null;
  item: IContacts | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: null,
  item: null,
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearItem(state) {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(createContact.pending, (state) => {
        handlePending(state);
      })
      .addCase(createContact.fulfilled, (state, action) => {
        if (state.contacts) {
          state.contacts.push(action.payload);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(fetchContactsByKeyword.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContactsByKeyword.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(fetchContactById.pending, (state) => {
        handlePending(state);
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.item = action.payload as IContacts;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(updateContactById.pending, (state) => {
        handlePending(state);
      })
      .addCase(updateContactById.fulfilled, (state, action) => {
        state.contacts = state.contacts
          ? state.contacts.map((contact) =>
              contact.id === action.payload.id ? action.payload : contact
            )
          : null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateContactById.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(deleteContactById.pending, (state) => {
        handlePending(state);
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        state.contacts = state.contacts
          ? state.contacts.filter((contact) => contact.id !== action.payload)
          : null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContactById.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export const { clearItem } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
