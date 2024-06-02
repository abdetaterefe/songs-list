import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchSongsRequest } from "@/redux/slices/songs";
import { useEffect } from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight, Edit, Music, Trash } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@/components/ui/button";
import { convertSecondsToMinutes } from "@/lib/utils";

const containerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const mainStyle = css`
  flex: 1;
  padding: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border-bottom: 1px hsl(var(--border)) solid;
  &:hover {
    background: hsl(var(--accent) / 0.5);
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  color: hsl(var(--muted-foreground));
`;

const Td = styled.td`
  padding: 8px;
  white-space: nowrap;
`;

export default function Home() {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page } = useParams();

  useEffect(() => {
    dispatch(fetchSongsRequest(page ? Number(page) : 1));
  }, [dispatch, page]);

  return (
    <div className={containerStyle}>
      <main className={mainStyle}>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <div
              className={css`
                overflow-x: auto;
              `}
            >
              <Table>
                <thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Artist</Th>
                    <Th>Duration</Th>
                    <Th>Actions</Th>
                  </Tr>
                </thead>
                <tbody>
                  {songs.map((song) => (
                    <Tr key={song.id}>
                      <Td>
                        <Link
                          className={css`
                            color: hsl(var(--primary));
                            font-weight: bold;
                            display: flex;
                            gap: 1rem;
                            text-decoration: none;

                            &:hover {
                              color: blue;
                            }
                          `}
                          to={`/song/${song.id}`}
                        >
                          <Music />
                          {song.title}
                        </Link>
                      </Td>
                      <Td>{song.artist}</Td>
                      <Td>{convertSecondsToMinutes(song.duration!)}</Td>
                      <Td>
                        <Button
                          size="icon"
                          variant="ghost"
                          style={{ marginRight: "1rem" }}
                          onClick={() => navigate(`/song/${song.id}/edit`)}
                        >
                          <Edit
                            className={css`
                              height: 1rem;
                              width: 1rem;
                            `}
                          />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => navigate(`/song/${song.id}/delete`)}
                        >
                          <Trash
                            className={css`
                              height: 1rem;
                              width: 1rem;
                            `}
                          />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div
              className={css`
                display: flex;
                margin-top: 1.5rem;
                justify-content: space-between;
              `}
            >
              {Number(page) === 1 || !page ? (
                <div></div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/page/${Number(page) - 1}`)}
                >
                  <ChevronLeft />
                  <span>Previous Page</span>
                </Button>
              )}
              {songs.length < 10 ? (
                <div></div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() =>
                    navigate(`/page/${page ? Number(page) + 1 : 2}`)
                  }
                >
                  <span>Next Page</span>
                  <ChevronRight />
                </Button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
