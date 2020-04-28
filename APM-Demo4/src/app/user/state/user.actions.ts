/* NgRx */
import { createAction, props, union } from '@ngrx/store';

export const maskUserName = createAction(
  '[User] Mask User Name',
  props<{ maskUserName: boolean }>()
);

export type UserActionsUnion = ReturnType<typeof maskUserName>;
