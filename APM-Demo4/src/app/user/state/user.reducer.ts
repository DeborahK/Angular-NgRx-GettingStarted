import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export function reducer(
  state = initialState,
  action: UserActions.UserActionsUnion
): UserState {

  switch (action.type) {
    case UserActions.maskUserName.type:
      return {
        ...state,
        maskUserName: action.maskUserName
      };

    default:
      return state;
  }
}
