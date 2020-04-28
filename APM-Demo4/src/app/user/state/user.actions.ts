/* NgRx */
import { createAction, props } from '@ngrx/store';

export const maskUserName = createAction(
  '[User] Mask User Name',
  props<{ maskUserName: boolean }>()
);
