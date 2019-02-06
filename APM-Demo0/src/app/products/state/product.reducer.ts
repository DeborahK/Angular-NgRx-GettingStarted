import { Product } from '../product';
import { AppState } from '../../state/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsAction, ProductActionsTypes } from './product.action';

export interface AppState extends AppState {
  products: ProductsState;
}

export interface ProductsState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductsState = {
  showProductCode: false,
  currentProduct: null,
  products: []
};

export const productReducer = (state = initialState, action: ProductsAction): ProductsState => {
  switch (action.type) {
    case ProductActionsTypes.ToggleProductCode: {
      return {
        ...state,
        showProductCode: action.payload
      };
    }

    default: return state;
  }
};

export const getProductState = createFeatureSelector<ProductsState>('products');

export const getShowProductCode = createSelector(
  getProductState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductState,
  state => state.currentProduct
);

export const getAllProducts = createSelector(
  getProductState,
  state => state.products
);
