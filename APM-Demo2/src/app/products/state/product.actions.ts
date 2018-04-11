import { IProduct } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';

// (1) Start with the action
export enum ProductStateActionTypes {
  ToggleProductCode = '[ProductState] Toggle Product Code',  // Helps to identify this in the logging
  ClearCurrentProduct = '[ProductState] Clear Current Product',
  SetCurrentProduct = '[ProductState] Set Current Product',
}

// (2) Action creator
export class ToggleProductCodeAction implements Action {
  readonly type = ProductStateActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

// Homework
export class ClearCurrentProductAction implements Action {
  readonly type = ProductStateActionTypes.ClearCurrentProduct;

  constructor() { }
}

// Homework
export class SetCurrentProductAction implements Action {
  readonly type = ProductStateActionTypes.SetCurrentProduct;

  constructor(public payload: IProduct) { }
}

// (3) Union all the valid types
export type ProductStateAction = ToggleProductCodeAction
  | ClearCurrentProductAction
  | SetCurrentProductAction;
