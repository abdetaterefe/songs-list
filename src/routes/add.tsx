import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { addSongRequest, Song } from "../redux/slices/songs";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const StyledForm = styled.form`
  width: 100%;
  border-spacing: 0;
  display: flex;
  flex-direction: column;
`;

const containerStyle = css`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 1.5rem;
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
        <StyledInput
          {...register("title", { required: true, disabled: loading })}
        />
        {errors.title && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Artist</label>
        <StyledInput
          {...register("artist", { required: true, disabled: loading })}
        />
        {errors.artist && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Album</label>
        <StyledInput
          {...register("album", { required: true, disabled: loading })}
        />
        {errors.album && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Genre</label>
        <StyledInput
          {...register("genre", { required: true, disabled: loading })}
        />
        {errors.genre && (
          <span className={errorStyle}>This field is required</span>
        )}

        <label>Year</label>
        <StyledInput
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
        <StyledInput
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
        <StyledInput {...register("lyrics", { disabled: loading })} />

        <input type="submit" disabled={loading} />
      </StyledForm>
    </div>
  );
}
