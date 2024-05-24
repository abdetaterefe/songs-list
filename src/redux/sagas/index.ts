import { all, fork } from "redux-saga/effects";
import songSaga from "./songs";

const rootSaga = function* () {
  yield all([
    fork(songSaga),
    // Other forks
  ]);
};

export default rootSaga;
