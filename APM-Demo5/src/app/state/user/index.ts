/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export * from './user-state.module';
export * from './auth.service';
export * from './user.reducer';
export * from './actions';

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);
