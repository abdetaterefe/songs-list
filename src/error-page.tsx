import { css } from "@emotion/css";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      className={css`
        padding: 16px;
      `}
      id="error-page"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{getErrorText(error)}</i>
      </p>
    </div>
  );
}

function getErrorText(error: unknown): string {
  if (typeof error === "string") {
    return error;
  } else if (typeof error === "object" && error !== null) {
    if ("statusText" in error) {
      return error.statusText as string;
    } else if ("message" in error) {
      return error.message as string;
    }
  }

  return "Unknown error";
}
