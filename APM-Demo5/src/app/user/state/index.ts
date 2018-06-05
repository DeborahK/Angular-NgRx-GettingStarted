// Homework
import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';
import { UserState } from './user.reducer';


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
