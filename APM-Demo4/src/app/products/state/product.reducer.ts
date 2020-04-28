import { Product } from '../product';

/* NgRx */
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import * as fromRoot from '../../state/app.state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  products: ProductState;
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

const productReducer = createReducer(
  initialState,
  on(ProductActions.toggleProductCode, (state, action) => {
    return {
      ...state,
      showProductCode: action.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action) => {
    return {
      ...state,
      currentProductId: action.product.id
    };
  }),
  on(ProductActions.clearCurrentProduct, state => {
    return {
      ...state,
      currentProductId: null
    };
  }),
  on(ProductActions.initializeCurrentProduct, state => {
    return {
      ...state,
      currentProductId: 0
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      error: ''
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action) => {
    return {
      ...state,
      products: [],
      error: action.error
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action) => {
    return {
      ...state,
      products: state.products.map(
        item => action.product.id === item.id ? action.product : item),
      currentProductId: action.product.id,
      error: ''
    };
  }),
  on(ProductActions.updateProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentProduct is the new product.
  on(ProductActions.createProductSuccess, (state, action) => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: ''
    };
  }),
  on(ProductActions.createProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentProduct is null.
  on(ProductActions.deleteProductSuccess, (state, action) => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function reducer(state: ProductState, action: ProductActions.ProductActionsUnion) {
  return productReducer(state, action);
}
