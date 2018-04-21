import { IProduct } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';

// (1) Start with the action
export enum ProductStateActionTypes {
  ToggleProductCode = '[ProductState] Toggle Product Code',
  ClearCurrentProduct = '[ProductState] Clear Current Product',
  SetCurrentProduct = '[ProductState] Set Current Product',
  LoadProducts = '[ProductState] Load Products',
  LoadProductsSuccess = '[ProductState] Load Products Success',
  LoadProductsFail = '[ProductState] Load Products Fail',
  UpdateProduct = '[ProductState] Update Product',
  UpdateProductSuccess = '[ProductState] Update Product Success',
  UpdateProductFail = '[ProductState] Update Product Fail',
  CreateProduct = '[ProductState] Create Product',
  CreateProductSuccess = '[ProductState] Create Product Success',
  CreateProductFail = '[ProductState] Create Product Fail',
  DeleteProduct = '[ProductState] Delete Product',
  DeleteProductSuccess = '[ProductState] Delete Product Success',
  DeleteProductFail = '[ProductState] Delete Product Fail'
}

// Action Creators
export class ToggleProductCodeAction implements Action {
  readonly type = ProductStateActionTypes.ToggleProductCode;

  constructor(public payload: boolean) { }
}

export class ClearCurrentProductAction implements Action {
  readonly type = ProductStateActionTypes.ClearCurrentProduct;

  constructor() { }
}

export class SetCurrentProductAction implements Action {
  readonly type = ProductStateActionTypes.SetCurrentProduct;

  constructor(public payload: IProduct) { }
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

export class CreateProductAction implements Action {
  readonly type = ProductStateActionTypes.CreateProduct;

  constructor(public payload: IProduct) { }
}

export class CreateProductSuccessAction implements Action {
  readonly type = ProductStateActionTypes.CreateProductSuccess;

  constructor(public payload: IProduct) { }
}

export class CreateProductFailAction implements Action {
  readonly type = ProductStateActionTypes.CreateProductFail;

  constructor(public payload: string) { }
}

export class DeleteProductAction implements Action {
  readonly type = ProductStateActionTypes.DeleteProduct;

  constructor(public payload: IProduct) { }
}

export class DeleteProductSuccessAction implements Action {
  readonly type = ProductStateActionTypes.DeleteProductSuccess;

  constructor(public payload: IProduct) { }
}

export class DeleteProductFailAction implements Action {
  readonly type = ProductStateActionTypes.DeleteProductFail;

  constructor(public payload: string) { }
}

// Union all the valid types
export type ProductStateActions = ToggleProductCodeAction
  | ClearCurrentProductAction
  | SetCurrentProductAction
  | LoadProductsAction
  | LoadProductsSuccessAction
  | LoadProductsFailAction
  | UpdateProductAction
  | UpdateProductSuccessAction
  | UpdateProductFailAction
  | CreateProductAction
  | CreateProductSuccessAction
  | CreateProductFailAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | DeleteProductFailAction

