import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { editSongRequest, fetchSongRequest, Song } from "../redux/slices/songs";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Textarea from "../components/ui/textarea";
import Label from "../components/ui/label";
import { useEffect } from "react";

const StyledForm = styled.form`
  border-spacing: 0;
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const containerStyle = css`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 1.5rem;
  items-align: center;
  justify-content: center;
`;

export default function Edit() {
  const { register, handleSubmit } = useForm<Song>();

  const song = useSelector((state: RootState) => state.songs.song);
  const loading = useSelector((state: RootState) => state.songs.isLoading);
  const error = useSelector((state: RootState) => state.songs.errors);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit: SubmitHandler<Song> = (data) => {
    dispatch(editSongRequest({ id: Number(id), song: data }));
    if (error === "") {
      navigate(`/song/${id}`, { state: song });
    }
  };

  useEffect(() => {
    dispatch(fetchSongRequest(Number(id)));
  }, [dispatch, id]);

  return (
    <div className={containerStyle}>
      <div>
        <div>
          <h1>Edit Music</h1>
        </div>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Label style={{ marginTop: "1rem" }}>Title</Label>
          <Input
            placeholder={song.title}
            {...register("title", { disabled: loading })}
          />

          <Label style={{ marginTop: "1rem" }}>Artist</Label>
          <Input
            placeholder={song.artist}
            {...register("artist", { disabled: loading })}
          />

          <Label style={{ marginTop: "1rem" }}>Album</Label>
          <Input
            placeholder={song.album}
            {...register("album", { disabled: loading })}
          />

          <Label style={{ marginTop: "1rem" }}>Genre</Label>
          <Input
            placeholder={song.genre}
            {...register("genre", { disabled: loading })}
          />

          <Label style={{ marginTop: "1rem" }}>Year</Label>
          <Input
            placeholder={song.year?.toString()}
            type="number"
            {...register("year", {
              disabled: loading,
              valueAsNumber: true,
            })}
          />

          <Label style={{ marginTop: "1rem" }}>Duration</Label>
          <Input
            placeholder={song.duration?.toString()}
            type="number"
            {...register("duration", {
              disabled: loading,
              valueAsNumber: true,
            })}
          />

          <Label style={{ marginTop: "1rem" }}>Lyrics</Label>
          <Textarea
            placeholder={song.lyrics}
            {...register("lyrics", { disabled: loading })}
          />

          <Button
            style={{ marginTop: "1rem" }}
            variant="outline"
            type="submit"
            disabled={loading}
          >
            Edit
          </Button>
        </StyledForm>
      </div>
    </div>
  );
}
