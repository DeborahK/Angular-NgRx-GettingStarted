import { Action } from '@ngrx/store';
import { IProduct } from '../product';

// (1) Start with the action
export enum ProductStateActionTypes {
  ToggleProductCode = '[ProductState] Toggle Product Code',
  LoadProducts = '[ProductState] Load Products',
  LoadProductsSuccess = '[ProductState] Load Products Success',
  LoadProductsFail = '[ProductState] Load Products Fail'
}

export class ToggleProductCodeAction implements Action {
  readonly type = ProductStateActionTypes.ToggleProductCode;

  constructor(public payload: boolean) { }
}

export class LoadProductsAction implements Action {
  readonly type = ProductStateActionTypes.LoadProducts;

  constructor() { }
}

export class LoadProductsActionSuccess implements Action {
  readonly type = ProductStateActionTypes.LoadProductsSuccess;

  constructor(public payload: IProduct[]) { }
}

export class LoadProductsFailAction implements Action {
  readonly type = ProductStateActionTypes.LoadProductsFail;

  constructor(public payload: string) { }
}

export type ProductStateAction = ToggleProductCodeAction
  | LoadProductsAction
  | LoadProductsActionSuccess
  | LoadProductsFailAction;
