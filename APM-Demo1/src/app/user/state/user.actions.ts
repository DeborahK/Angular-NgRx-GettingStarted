import { createAction, props } from '@ngrx/store';

export const maskUserName = createAction(
    'MASK_USER_NAME',
    props<{ mask: boolean }>()
);
