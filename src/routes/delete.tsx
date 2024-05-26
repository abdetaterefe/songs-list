import { css } from "@emotion/css";
import Button from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongRequest } from "../redux/slices/songs";
import { RootState } from "../redux/store";

const containerStyle = css`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 1.5rem;
  items-align: center;
  justify-content: center;
`;

export default function Delete() {
  const { handleSubmit } = useForm();
  const error = useSelector((state: RootState) => state.songs.errors);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = () => {
    dispatch(deleteSongRequest(Number(id)));
    if (error === "") {
      navigate("/");
    }
  };

  return (
    <div className={containerStyle}>
      <div>
        <div>
          <h1>Delete Music</h1>
        </div>
        <div>Are you sure you want to delete?</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="outline"
            style={{ marginRight: "2rem" }}
            onClick={() => navigate(`/song/${id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
