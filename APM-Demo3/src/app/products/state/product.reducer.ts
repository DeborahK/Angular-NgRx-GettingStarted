import { Product } from '../product';

/* NgRx */
import { ProductActions, ProductActionTypes } from './product.actions';
import * as fromRoot from '../../state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Single source of truth
export interface State extends fromRoot.State {
  productFeature: ProductState;
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const initialState: ProductState = {
  showProductCode: false,
  currentProduct: null,
  products: []
};

// Selector functions
export const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getCurentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export function reducer(
  state = initialState,
  action: ProductActions): ProductState {

  switch (action.type) {
    case ProductActionTypes.ToggleProductCode: {
      return { ...state, showProductCode: action.payload };
    }

    case ProductActionTypes.ClearCurrentProduct: {
      return {...state, currentProduct: null};
    }

    case ProductActionTypes.SetCurrentProduct: {
      return {...state, currentProduct: action.payload};
    }

    case ProductActionTypes.LoadSuccess: {
      return { ...state, products: action.payload };
    }

    default: {
      return state;
    }
  }
}
