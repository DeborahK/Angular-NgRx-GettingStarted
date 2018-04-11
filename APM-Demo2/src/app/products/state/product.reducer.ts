import { IProduct } from '../product';

/* NgRx */
import * as fromProduct from './product.actions';

// (1) Define the shape of the state
// State for this feature (Product)
export interface State {
  product: ProductState;
}

// Slice of the feature state
export interface ProductState {
  showProductCode: boolean;
  currentProduct: IProduct;
}

// (2) Define the initial values of the state
export const initialState: ProductState = {
  showProductCode: false,
  currentProduct: null
};

// (3) Use the initial state
// Change to the appropriate action
export function reducer(state = initialState, action: fromProduct.ProductStateAction): ProductState {

  switch (action.type) {
    case fromProduct.ProductStateActionTypes.ToggleProductCode: {
      // (4) Add state to the store
      return { ...state, showProductCode: action.payload };
    }

    // Homework
    case fromProduct.ProductStateActionTypes.ClearCurrentProduct: {
      return {...state, currentProduct: null};
    }

    // Homework
    case fromProduct.ProductStateActionTypes.SetCurrentProduct: {
      return {...state, currentProduct: action.payload};
    }

    default: {
      return state;
    }
  }
}
