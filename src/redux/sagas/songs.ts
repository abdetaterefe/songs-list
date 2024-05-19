import { put, call, takeEvery } from "redux-saga/effects";
import {
  fetchSongsSuccess,
  fetchSongsRequest,
  fetchSongsFailure,
} from "../slices/songs";
import { fetchSongsApi } from "../../lib/api";
import { SagaIterator } from "redux-saga";

function* fetchSongsSaga(): SagaIterator {
  try {
    const response = yield call(fetchSongsApi);
    const result = yield response.json();
    yield put(fetchSongsSuccess(result));
  } catch (error) {
    yield put(fetchSongsFailure());
  }
}

function* songSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
}

export default songSaga;
