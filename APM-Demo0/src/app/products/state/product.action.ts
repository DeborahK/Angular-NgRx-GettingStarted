import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionsTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product'
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionsTypes.ToggleProductCode;
  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionsTypes.SetCurrentProduct;
  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionsTypes.SetCurrentProduct;
}

export type ProductsAction =
| ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct;
