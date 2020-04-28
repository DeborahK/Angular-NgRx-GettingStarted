import { User } from '../user';

/* NgRx */
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './user.actions';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

const userReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state, action) => {
    return {
      ...state,
      maskUserName: action.maskUserName
    };
  })
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
