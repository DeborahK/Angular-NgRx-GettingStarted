import { createAction, createReducer, on } from "@ngrx/store";

export const userReducer = createReducer(
  { maskUserName: false },
  on(createAction('[USER] toggle username'), state => {
    console.log('original state: ' + JSON.stringify(state));

    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
)