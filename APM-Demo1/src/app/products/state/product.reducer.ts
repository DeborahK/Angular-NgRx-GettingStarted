export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      // (4) Add state to the store
      return { showProductCode: action.payload };
    default: {
      return state;
    }
  }
}
