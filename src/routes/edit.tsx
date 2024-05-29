import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { editSongRequest, fetchSongRequest, Song } from "@/redux/slices/songs";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Label from "@/components/ui/label";
import { useEffect } from "react";

const StyledForm = styled.form`
  border-spacing: 0;
  display: flex;
  flex-direction: column;
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    dispatch(
      editSongRequest({
        id: Number(id),
        song: {
          artist: data.artist ? data.artist : song.artist,
          year: data.year ? data.year : song.year,
          genre: data.genre ? data.genre : song.genre,
          duration: data.duration ? data.duration : song.duration,
          album: data.album ? data.album : song.album,
          title: data.title ? data.title : song.title,
          lyrics: data.lyrics ? data.lyrics : song.lyrics,
        },
      })
    );
    if (error === "") {
      navigate(`/song/${id}`);
    }
  };

  useEffect(() => {
    dispatch(fetchSongRequest(Number(id)));
  }, [dispatch, id]);

  return (
    <div className={containerStyle}>
      <div
        className={css`
          padding: 2rem;
          width: 100%;
          max-width: 28rem;
        `}
      >
        <h1
          className={css`
            margin-bottom: 1.5rem;
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            text-align: center;
            color: #111827;
          `}
        >
          Edit Song
        </h1>

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
            {...register("album", {
              disabled: loading,
            })}
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
            style={{ minWidth: "100%", maxWidth: "100%" }}
            placeholder={song.lyrics}
            {...register("lyrics", { disabled: loading })}
          />

          <Button
            style={{ marginTop: "1rem" }}
            type="submit"
            disabled={loading}
          >
            Edit Song
          </Button>
        </StyledForm>
      </div>
    </div>
  );
}
