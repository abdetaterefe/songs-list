import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSongsRequest } from "../redux/slices/songs";
import { useEffect } from "react";
import { css } from "@emotion/css";
import { Button } from "rebass";
import styled from "@emotion/styled";
import { Edit, Trash } from "lucide-react";

const containerStyle = css`
  display: flex;
  height: 100vh;
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
  border-spacing: 0;
  table-layout: fixed;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Th = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export default function Home() {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  return (
    <div className={containerStyle}>
      <main className={mainStyle}>
        <div
          className={css`
            display: flex;
            margin-bottom: 1.5rem;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <h2
            className={css`
              font-size: 1.25rem;
              line-height: 1.75rem;
              font-weight: 700;
            `}
          >
            Song List
          </h2>
          <Button bg="blue">Add Song</Button>
        </div>

        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
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
                    <Td>{song.title}</Td>
                    <Td>{song.artist}</Td>
                    <Td>{song.duration}</Td>
                    <Td>
                      <Button bg="blue" mr={2}>
                        <Edit />
                      </Button>
                      <Button bg="blue">
                        <Trash />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </main>
    </div>
  );
}
