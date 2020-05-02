import { createReducer, on, createAction } from '@ngrx/store';

const userReducer = createReducer(
  { maskUserName: true },
  on(createAction('[User] Mask User Name'), state => ({
    ...state,
    maskUserName: !state.maskUserName
  })),
);

export function reducer(state, action) {
  return userReducer(state, action);
}
