import { Vendor } from '../../models/vendor';

/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { VendorApiActions, VendorPageActions } from '../../../vendors/actions';
import * as AppState from '../../state/app.state';
import { ProductState } from '../products/product.reducer';

// Extends the app state to include the vendor feature.
// This is required because vendors are lazy loaded.
// So the reference to VendorState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  vendors: VendorState;
}

// State for this feature (Vendor)
export interface VendorState {
  currentVendorId: number | null;
  vendors: Vendor[];
  error: string;
}

const initialState: VendorState = {
  currentVendorId: null,
  vendors: [],
  error: ''
};

// Selector functions
const getVendorFeatureState = createFeatureSelector<VendorState>('vendors');
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getCurrentVendorId = createSelector(
  getVendorFeatureState,
  state => state.currentVendorId
);

export const getCurrentVendor = createSelector(
  getVendorFeatureState,
  getCurrentVendorId,
  (state, currentVendorId) => {
    return currentVendorId ? state.vendors.find(p => p.id === currentVendorId) : null;
  }
);

export const getVendorProducts = createSelector(
  getCurrentVendorId,
  getProductFeatureState,
  (currentVendorId, productState) => {
    console.log(productState);
    return currentVendorId ? productState.products.filter(p => p.vendorId === currentVendorId) : null;
  }
);

export const getVendors = createSelector(
  getVendorFeatureState,
  state => state.vendors
);

export const getError = createSelector(
  getVendorFeatureState,
  state => state.error
);

export const vendorReducer = createReducer<VendorState>(
  initialState,
  on(VendorPageActions.setCurrentVendor, (state, action): VendorState => {
    return {
      ...state,
      currentVendorId: action.currentVendorId
    };
  }),
  on(VendorApiActions.loadVendorsSuccess, (state, action): VendorState => {
    return {
      ...state,
      vendors: action.vendors,
      error: ''
    };
  }),
  on(VendorApiActions.loadVendorsFailure, (state, action): VendorState => {
    return {
      ...state,
      vendors: [],
      error: action.error
    };
  })

);
