import { css } from "@emotion/css";
import Button from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongRequest } from "@/redux/slices/songs";
import { RootState } from "@/redux/store";
import styled from "@emotion/styled";
import { toast } from "sonner";

const containerStyle = css`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 1.5rem;
  items-align: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  border-spacing: 0;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-direction: column;
`;

export default function Delete() {
  const { handleSubmit } = useForm();
  const isLoading = useSelector((state: RootState) => state.songs.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = () => {
    dispatch(deleteSongRequest(Number(id)));
    if (!isLoading) {
      navigate("/");
      toast.success("Song has been deleted");
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
          Delete Song
        </h1>
        <div
          className={css`
            text-align: center;
          `}
        >
          Are you sure you want to delete?
        </div>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Button variant="outline" onClick={() => navigate(`/song/${id}`)}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </StyledForm>
      </div>
    </div>
  );
}
