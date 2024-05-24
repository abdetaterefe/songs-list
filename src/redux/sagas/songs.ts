import { put, call, takeEvery } from "redux-saga/effects";
import {
  fetchSongsSuccess,
  fetchSongsRequest,
  fetchSongsFailure,
  fetchSongRequest,
  fetchSongFailure,
  fetchSongSuccess,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  Song,
} from "../slices/songs";
import { fetchSongsApi, fetchSongApi, addSongsApi } from "../../lib/api";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

function* addSongSaga(action: PayloadAction<Song>): SagaIterator {
  try {
    const song = action.payload;
    const response = yield call(addSongsApi, song);
    const res = yield response.json();
    if (res === 1) yield put(addSongSuccess(song));
    else yield put(addSongFailure(res));
  } catch (error) {
    yield put(addSongFailure(error));
  }
}

function* fetchSongsSaga(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(fetchSongsApi, action.payload);
    const result = yield response.json();
    yield put(fetchSongsSuccess(result));
  } catch (error) {
    yield put(fetchSongsFailure(error));
  }
}

function* fetchSongSaga(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(fetchSongApi, action.payload);
    const result = yield response.json();
    if (result.length == 0)
      yield put(fetchSongFailure("no long found with that id"));
    else yield put(fetchSongSuccess(result));
  } catch (error) {
    yield put(fetchSongFailure(error));
  }
}

function* songSaga() {
  yield takeEvery(fetchSongRequest.type, fetchSongSaga);
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
  yield takeEvery(addSongRequest.type, addSongSaga);
}

export default songSaga;
