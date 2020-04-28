import { Product } from '../product';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export function reducer(
  state = initialState,
  action: ProductActions.ProductActionsUnion
): ProductState {

  switch (action.type) {
    case ProductActions.toggleProductCode.type:
      return {
        ...state,
        showProductCode: action.showProductCode
      };

    case ProductActions.setCurrentProduct.type:
      return {
        ...state,
        currentProductId: action.product.id
      };

    case ProductActions.clearCurrentProduct.type:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActions.initializeCurrentProduct.type:
      return {
        ...state,
        currentProductId: 0
      };

    case ProductActions.loadProductsSuccess.type:
      return {
        ...state,
        products: action.products,
        error: ''
      };

    case ProductActions.loadProductsFailure.type:
      return {
        ...state,
        products: [],
        error: action.error
      };

    case ProductActions.updateProductSuccess.type:
      const updatedProducts = state.products.map(
        item => action.product.id === item.id ? action.product : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.product.id,
        error: ''
      };

    case ProductActions.updateProductFail.type:
      return {
        ...state,
        error: action.error
      };

    // After a create, the currentProduct is the new product.
    case ProductActions.createProductSuccess.type:
      return {
        ...state,
        products: [...state.products, action.product],
        currentProductId: action.product.id,
        error: ''
      };

    case ProductActions.createProductFail.type:
      return {
        ...state,
        error: action.error
      };

    // After a delete, the currentProduct is null.
    case ProductActions.deleteProductSuccess.type:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.productId),
        currentProductId: null,
        error: ''
      };

    case ProductActions.deleteProductFail.type:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}
