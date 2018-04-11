import { IProduct } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';

// (1) Start with the action
export enum ProductStateActionTypes {
  ToggleProductCode = '[ProductState] Toggle Product Code',
  LoadProducts = '[ProductState] Load Products',
  LoadProductsSuccess = '[ProductState] Load Products Success',
  LoadProductsFail = '[ProductState] Load Products Fail',
  ClearCurrentProduct = '[ProductState] Clear Current Product',
  SetCurrentProduct = '[ProductState] Set Current Product',
  UpdateProduct = '[ProductState] Update Product',
  UpdateProductSuccess = '[ProductState] Update Product Success',
  UpdateProductFail = '[ProductState] Update Product Fail'
}

export class ToggleProductCodeAction implements Action {
  readonly type = ProductStateActionTypes.ToggleProductCode;

  constructor(public payload: boolean) { }
}

export class LoadProductsAction implements Action {
  readonly type = ProductStateActionTypes.LoadProducts;

  constructor() { }
}

export class LoadProductsSuccessAction implements Action {
  readonly type = ProductStateActionTypes.LoadProductsSuccess;

  constructor(public payload: IProduct[]) { }
}

export class LoadProductsFailAction implements Action {
  readonly type = ProductStateActionTypes.LoadProductsFail;

  constructor(public payload: string) { }
}

// Discuss the multiple ways to accomplish this
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

export class UpdateProductAction implements Action {
  readonly type = ProductStateActionTypes.UpdateProduct;

  constructor(public payload: IProduct) { }
}

export class UpdateProductSuccessAction implements Action {
  readonly type = ProductStateActionTypes.UpdateProductSuccess;

  constructor(public payload: IProduct) { }
}

export class UpdateProductFailAction implements Action {
  readonly type = ProductStateActionTypes.UpdateProductFail;

  constructor(public payload: string) { }
}

export type ProductStateAction = ToggleProductCodeAction
  | LoadProductsAction
  | LoadProductsSuccessAction
  | LoadProductsFailAction
  | ClearCurrentProductAction
  | SetCurrentProductAction
  | UpdateProductAction
  | UpdateProductSuccessAction
  | UpdateProductFailAction;
