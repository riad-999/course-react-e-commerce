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
    console.log(action.payload);
    return {
      ...state,
      all_products:[...action.payload],
      filtered_products:[...action.payload]}
  }
  if(type === SET_GRIDVIEW){
    return {...state,gridView: true};
  }
  if(type === SET_LISTVIEW){
    return {...state,gridView: false};
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
