import { createAction, createReducer , on} from "@ngrx/store";

export const productReducer = createReducer(
    {showProductCode:true},
    on(createAction('[Product] Toggle Product code') , state=>{
        return{
            ...state, // shallow copy
            showProductCode: !state.showProductCode
        };
    })
)