// Homework
import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
const getProductFeatureState = createFeatureSelector<UserState>('users');

export const getCurentUser = createSelector(
  getProductFeatureState,
  state => state.currentUser
);

export const getMaskUserName = createSelector(
  getProductFeatureState,
  state => state.maskUserName
);

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return { ...state, maskUserName: action.payload };
    default:
      return state;
  }
}
