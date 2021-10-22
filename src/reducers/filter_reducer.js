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
    const {all_products} = state;
    const {text,category,company,color,price,
    shipping} = state.filters;
    let tempProducts = [...all_products];
    if(text){
      tempProducts = tempProducts.filter(product => {
        return product.name.toLowerCase().startsWith(text) 
      });
    }
    if(category !== 'all'){
      tempProducts = tempProducts.filter(product => {
        return product.category === category;
      });
    }
    if(company !== 'all'){
      tempProducts = tempProducts.filter(product => {
        return product.company === company;
      });
    }
    if(color !== 'all'){
      tempProducts = tempProducts.filter(product => {
        return product.colors.find(c => c === color);
      });
    }
    if(shipping){
      tempProducts = tempProducts.filter(
        product => product.shipping
      );
    }
    tempProducts = tempProducts.filter(
      product => product.price <= price
    );
    return {
      ...state,
      filtered_products: tempProducts
    };
  }
  if(type === CLEAR_FILTERS){
    return {
      ...state,
      filters: {
      ...state.filters,
      text:'',
      company: 'all',
      category:'all',
      color:'all',
      price: state.filters.maxPrice,
      shipping:false
    }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
