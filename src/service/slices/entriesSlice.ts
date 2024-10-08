import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Entry {
  id?: string;
  title: string;
  description: string;
}

interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<Entry>) {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<Entry>) => {
      const index = state.entries.findIndex(
        (entrie) => entrie.id === action.payload.id
      );
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(
        (entrie) => entrie.id !== action.payload
      );
    },
  },
});

export const { addEntry, deleteEntry, updateEntry } = entriesSlice.actions;
export default entriesSlice.reducer;
