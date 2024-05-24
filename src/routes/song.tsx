import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSongRequest } from "../redux/slices/songs";

export default function Song() {
  const song = useSelector((state: RootState) => state.songs.song);
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);
  const error = useSelector((state: RootState) => state.songs.errors);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongRequest(Number(id)));
  }, [dispatch, id]);

  return (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>
            <div>{song.title}</div>
          </div>
          <div>
            <div>{error}</div>
          </div>
        </>
      )}
    </div>
  );
}
