import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Song {
  id?: number;
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  year?: number;
  duration?: number;
  lyrics?: string;
}

const initialState = {
  songs: [] as Song[],
  song: {} as Song,
  isLoading: false,
  errors: "",
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.isLoading = true;
      state.errors = "";
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    fetchSongsFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchSongRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.errors = "";
    },
    fetchSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.isLoading = false;
    },
    fetchSongFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addSongRequest: (state, action: PayloadAction<Song>) => {
      state.isLoading = true;
      state.errors = "";
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.isLoading = false;
    },
    addSongFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
