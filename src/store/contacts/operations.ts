import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContacts } from "../../interfaces/interfaces";
import { handleError, instance } from "../init";
import { RootState } from "../store";

export const fetchContacts = createAsyncThunk<IContacts[], void>(
  "contacts/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("User is not authenticated");

      const { data } = await instance.get("contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch contacts"));
    }
  }
);
export const fetchContactsByKeyword = createAsyncThunk<
  IContacts[],
  { keyword: string }
>(
  "contacts/getByKeyword",
  async ({ keyword }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("User is not authenticated");
      const { data } = await instance.get("contacts/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: keyword },
      });
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to fetch contacts"));
    }
  }
);

export const createContact = createAsyncThunk<
  IContacts,
  {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    description?: string;
  }
>("contacts/create", async (contact, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (!token) throw new Error("User is not authenticated");
    const { data } = await instance.post("contacts", contact, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to create contact"));
  }
});

export const fetchContactById = createAsyncThunk<IContacts, { id: string }>(
  "contacts/getById",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("User is not authenticated");

      const { data } = await instance.get(`contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to get contact by id"));
    }
  }
);

export const updateContactById = createAsyncThunk<
  IContacts,
  { id: string; updatedData: Partial<IContacts> }
>(
  "contacts/updateById",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("User is not authenticated");

      const { data } = await instance.put(`contacts/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to update contact by id"));
    }
  }
);

export const deleteContactById = createAsyncThunk<string, { id: string }>(
  "contacts/deleteById",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("User is not authenticated");
      await instance.delete(`contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to delete contact by id"));
    }
  }
);
