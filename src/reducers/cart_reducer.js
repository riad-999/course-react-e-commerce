import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const {type} = action;
  if(type === ADD_TO_CART){
    const {id,color,amount,product} = action.payload;
    const tempItem = state.cart.find(item => item.id === id + color);
    if(tempItem){
      const tempCart = state.map(product => {
        if(product.id === id + color){
          let newAmount = product.amount + amount;
          if(newAmount > tempItem.max){
            newAmount = tempItem.max;
          }
          return {...product,amount: newAmount};
        }
        return product;
      });
      return {
        ...state,
        cart: tempCart
      };
    }
    else{
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image:product.images[0].url,
        price: product.price,
        max: product.stock
      };
      return {
        ...state,
        cart: [...state.cart, newItem]
      };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
