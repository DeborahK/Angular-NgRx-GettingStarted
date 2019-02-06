import { UserState, userReducer } from '../user/state/user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer
};
