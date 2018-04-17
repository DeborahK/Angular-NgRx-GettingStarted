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
//                feature        reducer reducerProperty
// state => state.product.invoices.data
// state => state.product.product.data

// choices
// state => state.product.product.data
// state => state.productFeature.product.data
// state => state.product.productState.data
// state => state.productFeature.productState.data

// this.store.pipe(select(getProducts))


// state => state.counter.data.count
// state => state.counter.list.
//
export interface ProductState {
  showProductCode: boolean;
  currentProduct: IProduct;
  data: IProduct[];
}

export const initialState: ProductState = {
  showProductCode: false,
  currentProduct: null,
  data: []
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

    case fromProduct.ProductStateActionTypes.LoadProductsSuccess: {
      return { ...state, data: action.payload };
    }

    case ProductStateActionTypes.UpdateProductSuccess: {
      // const newProducts = state.products.map(item => {
      // if (action.payload.id !== item.id) {
      //   // This isn't the item we care about - keep it as-is
      //   return item;
      // }

      // // Otherwise, this is the one we want - return an updated value
      // return action.payload;
      const newProducts = state.data.map(
        item => action.payload.id === item.id ? action.payload : item);
      return { ...state, currentProduct: action.payload, data: newProducts };
    }

    default: {
      return state;
    }
  }
}
