import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { addSongRequest, Song } from "../redux/slices/songs";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Textarea from "../components/ui/textarea";

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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <Input
          placeholder="title"
          {...register("title", { required: true, disabled: loading })}
        />
        {errors.title && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Artist</label>
        <Input
          placeholder="artist"
          {...register("artist", { required: true, disabled: loading })}
        />
        {errors.artist && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Album</label>
        <Input
          placeholder="album"
          {...register("album", { required: true, disabled: loading })}
        />
        {errors.album && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Genre</label>
        <Input
          placeholder="genre"
          {...register("genre", { required: true, disabled: loading })}
        />
        {errors.genre && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Year</label>
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

        <label>Duration</label>
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

        <label>Lyrics</label>
        <Textarea
          placeholder="lyrics"
          {...register("lyrics", { disabled: loading })}
        />

        <Button type="submit" disabled={loading}>
          Add
        </Button>
      </StyledForm>
    </div>
  );
}
