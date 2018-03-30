// (4) "Barrel" (ES 2015 modules)
import * as fromProduct from './product.reducer';
import { ActionReducerMap } from '@ngrx/store';

// Strongly type our state
export interface State {
  product: fromProduct.State
}

// 
export const reducers: ActionReducerMap<State> = {
  product: fromProduct.reducer,
};