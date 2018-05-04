import { Product } from '../product';

/* NgRx */
import { ProductActions, ProductActionTypes } from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Optionally, define a single State interface
// that encompasses all of the feature states
// to expose all feature states to the application
// In app | state | index.ts
// export interface State {
//   root: any;
// }
// In feature's reducer
// import * as fromRoot from '../../state';
// export interface State extends fromRoot.State {
//   productFeature: ProductState;
// }

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

// For demonstration of parameterized selector functions
// Not used.
export const getProductById = id => createSelector(
  getProductFeatureState,
  state => state.products.find(p => p.id === id)
);

export function reducer(state = initialState, action: ProductActions): ProductState {

  switch (action.type) {
    case ProductActionTypes.ToggleProductCode: {
      return { ...state, showProductCode: action.payload };
    }

    case ProductActionTypes.ClearCurrentProduct: {
      return {...state, currentProduct: null};
    }

    case ProductActionTypes.SetCurrentProduct: {
      return {...state, currentProduct: {...action.payload}};
    }

    case ProductActionTypes.LoadSuccess: {
      return {...state, products: [...action.payload]};
    }

    case ProductActionTypes.UpdateProductSuccess: {
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item);
      return { ...state, products: updatedProducts, currentProduct: action.payload };
    }

    // After a create, the currentProduct is the new product.
    case ProductActionTypes.CreateProductSuccess: {
      return { ...state, products: [...state.products, action.payload], currentProduct: action.payload };
    }

    // After a delete, the currentProduct is null.
    case ProductActionTypes.DeleteProductSuccess: {
      return { ...state, products: state.products.filter(product => product.id !== action.payload.id), currentProduct: null };
    }

    default: {
      return state;
    }
  }
}
