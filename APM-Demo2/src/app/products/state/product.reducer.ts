import * as fromProduct from './product.actions'

// (1) Define the shape of the state
export interface State {
  showProductCode: boolean
}

// (2) Define the initial values of the state
export const initialState: State = {
  showProductCode: false
}

// (3) Use the initial state
// Change to the appropriate action
export function reducer(state = initialState, action: fromProduct.ProductStateAction): State {

  switch (action.type) {
    case fromProduct.ProductStateActionTypes.ToggleProductCode:
      // (4) Add state to the store
      return { showProductCode: action.payload };
      
    default: {
      return state;
    }
  }
}
