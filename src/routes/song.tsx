import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSongRequest } from "../redux/slices/songs";
import { css } from "@emotion/css";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const cardStyle = css`
  max-width: 48rem;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const paddingStyle = css`
  padding: 1.5rem;
`;

const flex1Style = css`
  flex: 1;
  space-y: 1rem;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const hStyle = css`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: #111827;
`;

const pStyle = css`
  font-weight: 500;
  color: #6b7280;
`;

const pInfoStyle = css`
  color: #111827;
`;

const lyricStyle = css`
  color: #374151;
  white-space: pre-wrap;
`;

export default function Song() {
  const song = useSelector((state: RootState) => state.songs.song);
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);
  const error = useSelector((state: RootState) => state.songs.errors);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongRequest(Number(id)));
  }, [dispatch, id]);

  console.log(song);

  return (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className={containerStyle}>
            <div className={cardStyle}>
              <div className={paddingStyle}>
                <div className={flex1Style}>
                  <div>
                    <h1 className={hStyle}>{song.title}</h1>
                    <p className={pInfoStyle}>{song.artist}</p>
                  </div>
                  <div className={gridStyle}>
                    <div>
                      <p className={pStyle}>Album</p>
                      <p className={pInfoStyle}>{song.album}</p>
                    </div>
                    <div>
                      <p className={pStyle}>Genre</p>
                      <p className={pInfoStyle}>{song.genre}</p>
                    </div>
                    <div>
                      <p className={pStyle}>Year</p>
                      <p className={pInfoStyle}>{song.year}</p>
                    </div>
                    <div>
                      <p className={pStyle}>Duration</p>
                      <p className={pInfoStyle}>{song.duration}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className={hStyle}>Lyrics</h2>
                  <div className={lyricStyle}>
                    {song.lyrics ? song.lyrics : "no lyrics found :("}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>{error}</div>
          </div>
        </>
      )}
    </div>
  );
}
