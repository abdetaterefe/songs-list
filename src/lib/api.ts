import { Song } from "@/redux/slices/songs";

const apiUrl = "https://songs-list-api.abdeta.dev";
const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const baseFetch = (url: string, options = {}) =>
  fetch(url, { headers, ...options });

export const fetchSongsApi = (page: number) =>
  baseFetch(`${apiUrl}/api/v1/songs?page=${page}`);

export const fetchSongApi = (id: number) =>
  baseFetch(`${apiUrl}/api/v1/songs/${id}`);

export const editSongApi = (id: number, song: Song) =>
  baseFetch(`${apiUrl}/api/v1/songs/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...song }),
  });

export const deleteSongApi = (id: number) =>
  baseFetch(`${apiUrl}/api/v1/songs/${id}`, {
    method: "DELETE",
  });

export const addSongsApi = (song: Song) =>
  baseFetch(`${apiUrl}/api/v1/songs`, {
    method: "POST",
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
