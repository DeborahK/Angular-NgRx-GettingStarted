import { User } from './user';

/* NgRx */
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { UserPageActions } from './actions';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
  error: string;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
  error: ''
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

export const getError = createSelector(
  getUserFeatureState,
  state => state.error
);

const userReducer = createReducer<UserState>(
  initialState,
  on(UserPageActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
