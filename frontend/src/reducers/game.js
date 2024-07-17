import { SYNC_GAME, PLAY_GAME } from '../constants/actionTypes';

const gameReducer = (state = { syncData: null, playData: null }, action) => {
  switch (action.type) {
    case SYNC_GAME:
      return { ...state, syncData: action?.data };

    case PLAY_GAME:
      return { ...state, playData: action?.data };

    default:
      return state;
  }
}
export default gameReducer;