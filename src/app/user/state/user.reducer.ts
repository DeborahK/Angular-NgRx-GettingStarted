// Homework
import { User } from '../user';

import { createFeatureSelector, createSelector } from 'mini-rx-store';
import { reducer as createReducer, on} from 'ts-action';
import { UserPageActions } from './actions';

// State for this feature (User)
export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(getUserFeatureState, (state) => state.maskUserName);

export const getCurrentUser = createSelector(getUserFeatureState, (state) => state.currentUser);

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserPageActions.maskUserName, (state): UserState => {
        return {
            ...state,
            maskUserName: !state.maskUserName,
        };
    })
);
