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
  if(type === REMOVE_CART_ITEM){
    const tempCart = 
    state.cart.filter(product => product.id !== action.payload);
    return {
      ...state,
      cart: tempCart
    };
  }
  if(type === CLEAR_CART){
    return {
      ...state,
      cart: []
    };
  }
  if(type === TOGGLE_CART_ITEM_AMOUNT){
    const {id,flag} = action.payload;
    const newCart = state.cart.map(product => {
      if(id === product.id){
        if(flag === 'inc'){
          let newAmount = product.amount + 1 ;
          if(newAmount > product.max){
            newAmount = product.max;
          }
          return {
            ...product,
            amount: newAmount
          };
        }
        if(flag === 'dec'){
          let newAmount = product.amount - 1;
          if(newAmount < 1){
            newAmount = 1;
          }
          return {
            ...product,
            amount: newAmount
          };
        }
      }
      return product;
    });
    return {
      ...state,
      cart: newCart
    };
  }
  if(type === COUNT_CART_TOTALS){
    const {total_items,total_amount} = state.cart.reduce((acc,product) => {
      const {amount,price} = product;
      acc.total_items += amount;
      acc.total_amount += price * amount;
      return acc;
    },{
      total_items: 0,total_amount:0
    });
    return {
      ...state,
      total_items,
      total_amount
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
