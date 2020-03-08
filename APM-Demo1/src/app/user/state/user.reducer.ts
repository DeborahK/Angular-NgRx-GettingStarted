import { createReducer, on } from '@ngrx/store';
import { maskUserName } from './user.actions';

const userReducer = createReducer(
  {},
  on(maskUserName, (state: any, action: any) => ({ ...state, maskUserName: action.mask })),
);

export function reducer(state, action) {
  return userReducer(state, action);
}
