import { Song } from "../redux/slices/songs";

export const fetchSongsApi = (page: number) =>
  fetch(`http://localhost:3000/api/v1/songs?page=${page}`);

export const fetchSongApi = (id: number) =>
  fetch(`http://localhost:3000/api/v1/songs/${id}`);

export const editSongApi = (id: number, song: Song) =>
  fetch(`http://localhost:3000/api/v1/songs/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ ...song }),
  });

export const deleteSongApi = (id: number) =>
  fetch(`http://localhost:3000/api/v1/songs/${id}`, {
    method: "DELETE",
  });

export const addSongsApi = (song: Song) =>
  fetch("http://localhost:3000/api/v1/songs", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      year: song.year,
      duration: song.duration,
      lyrics: song.lyrics,
    }),
  });
