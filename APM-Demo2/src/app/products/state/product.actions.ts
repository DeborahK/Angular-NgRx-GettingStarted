import { Product } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  ClearCurrentProduct = '[Product] Clear Current Product',
  SetCurrentProduct = '[Product] Set Current Product',
}

// Action Creators
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

// Homework
export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  constructor() {}
}

// Homework
export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}

// Union the valid types
export type ProductActions = ToggleProductCode
  | ClearCurrentProduct
  | SetCurrentProduct;
