import { SYNC_GAME, PLAY_GAME } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const syncGame = (formData) => async (dispatch) => {
  try {
    const { data } = await api.syncGame(formData);
    dispatch({ type: SYNC_GAME, data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const playGame = (formData) => async (dispatch) => {
  try {
    const { data } = await api.playGame(formData);
    dispatch({ type: PLAY_GAME, data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
