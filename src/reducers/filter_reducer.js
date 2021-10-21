import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  const {type} = action;
  if(type === LOAD_PRODUCTS){
    const prices = action.payload.map(item => item.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    return {
      ...state,
      all_products:[...action.payload],
      filtered_products:[...action.payload],
      filters:{
        ...state.filters,
        maxPrice:max,
        price:max,
        minPrice:min
      }
    }
  }
  if(type === SET_GRIDVIEW){
    return {...state,gridView: true};
  }
  if(type === SET_LISTVIEW){
    return {...state,gridView: false};
  }
  if(type === UPDATE_SORT){
    return {...state,sort:action.payload}
  }
  if(type === SORT_PRODUCTS){
    const {sort,filtered_products} = state;
    let tempProducts = [...filtered_products];
    if(sort === 'price-lowest'){
      tempProducts = tempProducts.sort((a,b) => {
        return a.price - b.price;
      });
    }
    if(sort === 'price-highest'){
      tempProducts = tempProducts.sort((a,b) => {
        return b.price - a.price;
      });
    }
    if(sort === 'name-a'){
      tempProducts = tempProducts.sort((a,b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if(sort === 'name-z'){
      tempProducts = tempProducts.sort((a,b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {...state,filtered_products: tempProducts};
  }
  if(type === UPDATE_FILTERS){
    const {name,value} = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name] : value
      }
    }
  }
  if(type === FILTER_PRODUCTS){
    return {...state}
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
