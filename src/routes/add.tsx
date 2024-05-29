import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { RootState } from "@/redux/store";
import { addSongRequest, Song } from "@/redux/slices/songs";

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

const errorStyle = css`
  color: red;
  margin-left: 10px;
`;

export default function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Song>();

  const loading = useSelector((state: RootState) => state.songs.isLoading);
  const error = useSelector((state: RootState) => state.songs.errors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Song> = (data) => {
    dispatch(addSongRequest(data));
    if (error === "") {
      navigate("/");
    }
  };

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
          Add Song
        </h1>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Label style={{ marginTop: "1rem" }}>Title</Label>
          <Input
            placeholder="title"
            {...register("title", { required: true, disabled: loading })}
          />
          {errors.title && (
            <span className={errorStyle}>This field is required</span>
          )}
          <Label style={{ marginTop: "1rem" }}>Artist</Label>
          <Input
            placeholder="artist"
            {...register("artist", { required: true, disabled: loading })}
          />
          {errors.artist && (
            <span className={errorStyle}>This field is required</span>
          )}
          <Label style={{ marginTop: "1rem" }}>Album</Label>
          <Input
            placeholder="album"
            {...register("album", { required: true, disabled: loading })}
          />
          {errors.album && (
            <span className={errorStyle}>This field is required</span>
          )}
          <Label style={{ marginTop: "1rem" }}>Genre</Label>
          <Input
            placeholder="genre"
            {...register("genre", { required: true, disabled: loading })}
          />
          {errors.genre && (
            <span className={errorStyle}>This field is required</span>
          )}
          <Label style={{ marginTop: "1rem" }}>Year</Label>
          <Input
            placeholder="year"
            type="number"
            {...register("year", {
              required: true,
              disabled: loading,
              valueAsNumber: true,
            })}
          />
          {errors.year && (
            <span className={errorStyle}>This field is required</span>
          )}
          <Label style={{ marginTop: "1rem" }}>Duration</Label>
          <Input
            placeholder="duration"
            type="number"
            {...register("duration", {
              required: true,
              disabled: loading,
              valueAsNumber: true,
            })}
          />
          {errors.duration && (
            <span className={errorStyle}>This field is required</span>
          )}
          <Label style={{ marginTop: "1rem" }}>Lyrics</Label>
          <Textarea
            style={{ minWidth: "100%", maxWidth: "100%" }}
            placeholder="lyrics"
            {...register("lyrics", { disabled: loading })}
          />
          <Button
            style={{ marginTop: "1rem" }}
            type="submit"
            disabled={loading}
          >
            Add Song
          </Button>
        </StyledForm>
      </div>
    </div>
  );
}
