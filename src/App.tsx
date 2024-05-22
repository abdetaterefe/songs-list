import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchSongsRequest } from "./redux/slices/songs";
import { useEffect } from "react";

function App() {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {songs.map((song) => (
            <div key={song.id}>
              <h1>{song.title}</h1>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default App;
