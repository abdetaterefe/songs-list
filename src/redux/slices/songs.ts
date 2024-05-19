import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  userId: number;
  id: number;
  title: string;
}

const initialState = {
  songs: [] as Song[],
  isLoading: false,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.isLoading = true;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    fetchSongsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } =
  songsSlice.actions;

export default songsSlice.reducer;
