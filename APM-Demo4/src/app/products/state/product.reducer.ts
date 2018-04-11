import { IProduct } from '../product';

/* NgRx */
import * as fromProduct from './product.actions';

// State for this feature (Product)
export interface State {
  product: ProductState;
}

// Slice of the feature state
export interface ProductState {
  showProductCode: boolean;
  currentProduct: IProduct;
  products: IProduct[];
}

export const initialState: ProductState = {
  showProductCode: false,
  currentProduct: null,
  products: []
};

// Change to the appropriate action
export function reducer(state = initialState, action: fromProduct.ProductStateAction): ProductState {

  switch (action.type) {
    case fromProduct.ProductStateActionTypes.ToggleProductCode: {
      return { ...state, showProductCode: action.payload };
    }

    case fromProduct.ProductStateActionTypes.ClearCurrentProduct: {
      return {...state, currentProduct: null};
    }

    case fromProduct.ProductStateActionTypes.SetCurrentProduct: {
      return {...state, currentProduct: action.payload};
    }

    case fromProduct.ProductStateActionTypes.LoadProductsSuccess: {
      return { ...state, products: action.payload };
    }

    case fromProduct.ProductStateActionTypes.UpdateProductSuccess: {
      // const newProducts = state.products.map(item => {
      // if (action.payload.id !== item.id) {
      //   // This isn't the item we care about - keep it as-is
      //   return item;
      // }

      // // Otherwise, this is the one we want - return an updated value
      // return action.payload;
      const newProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item);
      return { ...state, currentProduct: action.payload, products: newProducts };
    }

    default: {
      return state;
    }
  }
}
