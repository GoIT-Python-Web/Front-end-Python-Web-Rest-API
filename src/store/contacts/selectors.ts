import { RootState } from "../store";

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectContact = (state: RootState) => state.contacts.item;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectError = (state: RootState) => state.contacts.error;
