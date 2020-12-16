import {LOGGED_IN} from './action-types';

export const setLoggedInFlag = (isLoggedIn) => ({
  type: LOGGED_IN,
  payload: isLoggedIn,
});
