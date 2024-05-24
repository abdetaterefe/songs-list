import { Song } from "../redux/slices/songs";

export const fetchSongsApi = () => fetch("http://localhost:3000/api/v1/songs");

export const fetchSongApi = (id: number) =>
  fetch(`http://localhost:3000/api/v1/songs/${id}`);

export const addSongsApi = (song: Song) =>
  fetch("http://localhost:3000/api/v1/songs", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      year: song.year,
      duration: song.duration,
      lyrics: song.lyrics,
    }),
  });
