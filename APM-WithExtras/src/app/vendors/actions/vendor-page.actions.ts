/* NgRx */
import { createAction, props } from '@ngrx/store';

export const setCurrentVendor = createAction(
  '[Vendor] Set Current Vendor',
  props<{ currentVendorId: number }>()
);

export const loadVendors = createAction(
  '[Vendor] Vendor Load'
);

export const loadProducts = createAction(
  '[Vendor] Product Load'
);
