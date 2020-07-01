import { createReducer, on, createAction } from '@ngrx/store';

export const userReducer = createReducer(
  { maskUserName: true },
  on(createAction('[User] Mask User Name'), state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
