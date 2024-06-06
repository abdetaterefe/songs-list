import { put, call, takeLatest } from "redux-saga/effects";
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
  editSongSuccess,
  editSongFailure,
  editSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  deleteSongRequest,
} from "@/redux/slices/songs";
import {
  fetchSongsApi,
  fetchSongApi,
  addSongsApi,
  editSongApi,
  deleteSongApi,
} from "@/lib/api";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

function* editSongSaga(
  action: PayloadAction<{ id: number; song: Song }>
): SagaIterator {
  try {
    const { id, song } = action.payload;
    const response = yield call(editSongApi, id, song);
    const res = yield response.json();
    if (response.ok) {
      yield put(editSongSuccess(song));
    } else {
      yield put(editSongFailure(res.message || "Failed to edit song"));
    }
  } catch (error) {
    yield put(editSongFailure(error));
  }
}

function* addSongSaga(action: PayloadAction<Song>): SagaIterator {
  try {
    const song = action.payload;
    const response = yield call(addSongsApi, song);
    const res = yield response.json();
    if (response.ok) {
      yield put(addSongSuccess(res));
    } else {
      yield put(addSongFailure(res.message || "Failed to add song"));
    }
  } catch (error) {
    yield put(addSongFailure(error));
  }
}

function* deleteSongSaga(action: PayloadAction<number>): SagaIterator {
  try {
    const id = action.payload;
    const response = yield call(deleteSongApi, id);
    const res = yield response.json();
    if (response.ok) {
      yield put(deleteSongSuccess(id));
    } else {
      yield put(deleteSongFailure(res.message || "Failed to delete song"));
    }
  } catch (error) {
    yield put(deleteSongFailure(error));
  }
}

function* fetchSongsSaga(action: PayloadAction<number>): SagaIterator {
  try {
    const page = action.payload;
    const response = yield call(fetchSongsApi, page);
    const result = yield response.json();
    if (response.ok) {
      yield put(fetchSongsSuccess(result));
    } else {
      yield put(fetchSongsFailure(result.message || "Failed to fetch songs"));
    }
  } catch (error) {
    yield put(fetchSongsFailure(error));
  }
}

function* fetchSongSaga(action: PayloadAction<number>): SagaIterator {
  try {
    const id = action.payload;
    const response = yield call(fetchSongApi, id);
    const result = yield response.json();
    if (response.ok && result) {
      yield put(fetchSongSuccess(result));
    } else {
      yield put(
        fetchSongFailure(result.message || "No song found with that ID")
      );
    }
  } catch (error) {
    yield put(fetchSongFailure(error));
  }
}

function* songSaga() {
  yield takeLatest(fetchSongRequest.type, fetchSongSaga);
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(addSongRequest.type, addSongSaga);
  yield takeLatest(editSongRequest.type, editSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}

export default songSaga;
