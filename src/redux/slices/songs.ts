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
  page: 0,
  songId: 0,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchSongsRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.page = action.payload;
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
      state.songId = action.payload;
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
      state.song = action.payload;
      state.errors = "";
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.songs.push(action.payload);
      state.isLoading = false;
    },
    addSongFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editSongRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ id: number; song: Song }>
    ) => {
      state.isLoading = true;
      state.songId = action.payload.id;
      state.errors = "";
    },
    editSongSuccess: (state, action: PayloadAction<Song>) => {
      const indexToReplace = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );

      const updatedSongsSplice = [...state.songs];

      updatedSongsSplice.splice(indexToReplace, 1, {
        ...state.songs[indexToReplace],
        ...action.payload,
      });
      state.song = state.songs[indexToReplace];
      state.isLoading = false;
    },
    editSongFailure: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteSongRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.songId = action.payload;
      state.errors = "";
    },
    deleteSongSuccess: (state, action: PayloadAction<number>) => {
      const removeIndex = state.songs
        .map((item) => item.id)
        .indexOf(action.payload);

      state.songs = state.songs.splice(removeIndex, 1);
      state.isLoading = false;
    },
    deleteSongFailure: (state, action) => {
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
  editSongRequest,
  editSongSuccess,
  editSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
