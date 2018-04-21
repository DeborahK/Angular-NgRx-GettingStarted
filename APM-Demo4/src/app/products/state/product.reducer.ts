import { IProduct } from '../product';

/* NgRx */
import { ProductStateActionTypes, ProductStateActions } from './product.actions';

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
export function reducer(state = initialState, action: ProductStateActions): ProductState {

  switch (action.type) {
    case ProductStateActionTypes.ToggleProductCode: {
      return { ...state, showProductCode: action.payload };
    }

    case ProductStateActionTypes.ClearCurrentProduct: {
      return { ...state, currentProduct: null };
    }

    case ProductStateActionTypes.SetCurrentProduct: {
      return { ...state, currentProduct: action.payload };
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

    case ProductStateActionTypes.CreateProductSuccess: {
      return { ...state, products: [...state.products, action.payload] };
    }

    case ProductStateActionTypes.DeleteProductSuccess: {
      return { ...state, products: state.products.filter(product => product.id !== action.payload.id), currentProduct: null };
    }

    default: {
      return state;
    }
  }
}
