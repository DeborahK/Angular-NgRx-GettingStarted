import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null
};

export const userReducer = (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    case 'MASK_USER_NAME': {
      return {
        ...state,
        maskUserName: action.payload
      };
    }

    default: return state;
  }
};


export const getUserState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserState,
  state => state.currentUser
);
