import { Vendor } from '../../shared/models/vendor';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadVendorsSuccess = createAction(
  '[Vendor] Load Success',
  props<{ vendors: Vendor[] }>()
);

export const loadVendorsFailure = createAction(
  '[Vendor] Load Fail',
  props<{ error: string }>()
);
