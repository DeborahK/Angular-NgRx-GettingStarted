import { Product } from '../product';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

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

export function reducer(state = initialState, action: ProductActions): ProductState {

  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };

    case ProductActionTypes.LoadSuccess: {
      return {
        ...state,
        products: [...action.payload],
        error: ''
      };
    }

    case ProductActionTypes.LoadFail: {
      return {
        ...state,
        products: [],
        error: action.payload
      };
    }

    case ProductActionTypes.UpdateProductSuccess: {
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    }

    case ProductActionTypes.UpdateProductFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    // After a create, the currentProduct is the new product.
    case ProductActionTypes.CreateProductSuccess: {
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };
    }

    case ProductActionTypes.CreateProductFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    // After a delete, the currentProduct is null.
    case ProductActionTypes.DeleteProductSuccess: {
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.id),
        currentProductId: null,
        error: ''
      };
    }

    case ProductActionTypes.DeleteProductFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
