import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSongRequest } from "@/redux/slices/songs";
import { css } from "@emotion/css";
import { convertSecondsToMinutes } from "@/lib/utils";
import Button from "@/components/ui/button";

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
`;

const paddingStyle = css`
  padding: 1.5rem;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const hStyle = css`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-top: 1rem;
`;

const pStyle = css`
  font-weight: 500;
  color: #111827;
`;

const pInfoStyle = css`
  // margin-top: 1rem;
  color: #6b7280;
`;

const lyricStyle = css`
  color: #374151;
  white-space: pre-wrap;
`;

export default function Song() {
  const song = useSelector((state: RootState) => state.songs.song);
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);

  const { id } = useParams();
  const navigate = useNavigate();
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
          <div className={containerStyle}>
            <div className={cardStyle}>
              <div className={paddingStyle}>
                <h1 className={hStyle}>{song.title}</h1>
                <p className={pInfoStyle}>{song.artist}</p>

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
                    <p className={pInfoStyle}>
                      {convertSecondsToMinutes(song.duration!)}
                    </p>
                  </div>
                </div>

                <h2 className={hStyle}>Lyrics</h2>
                <div className={lyricStyle}>
                  {song.lyrics ? song.lyrics : "no lyrics found :("}
                </div>
              </div>
              <div
                className={css`
                  display: flex;
                  gap: 1rem;
                `}
              >
                <Button
                  onClick={() => navigate(`/song/${song.id}/edit`)}
                  variant="outline"
                  style={{ width: "100%" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => navigate(`/song/${song.id}/delete`)}
                  variant="destructive"
                  style={{ width: "100%" }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
