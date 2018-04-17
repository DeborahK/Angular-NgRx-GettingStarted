import { IProduct } from '../product';

/* NgRx */
import { ProductStateAction, ProductStateActionTypes } from './product.actions';

// State for this feature (Product)
export interface State {
  productFeature: StateSlice;
}

export interface StateSlice {
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
export function reducer(state = initialState, action: ProductStateAction): ProductState {

  switch (action.type) {
    case ProductStateActionTypes.ToggleProductCode: {
      return { ...state, showProductCode: action.payload };
    }

    case ProductStateActionTypes.ClearCurrentProduct: {
      return {...state, currentProduct: null};
    }

    case ProductStateActionTypes.SetCurrentProduct: {
      return {...state, currentProduct: action.payload};
    }

    case ProductStateActionTypes.LoadProductsSuccess: {
      return { ...state, products: action.payload };
    }

    case ProductStateActionTypes.UpdateProductSuccess: {
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
