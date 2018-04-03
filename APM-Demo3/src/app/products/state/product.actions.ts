import { Action } from '@ngrx/store';

// (1)
export enum ProductStateActionTypes {
  ToggleProductCode = '[ProductState] Toggle Product Code'  // Helps to identify this in the logging
}

// (2) Action creator
export class ToggleProductCodeAction implements Action {
  readonly type = ProductStateActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

// (3) Union all the valid types
export type ProductStateAction = ToggleProductCodeAction;
