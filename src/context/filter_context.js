import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products:[],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text:'',
    company: 'all',
    category:'all',
    color:'all',
    minPrice:0,
    maxPrice:0,
    price:0,
    shipping:false
  }
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const {products} = useProductsContext();
  const [state,dispatch] = useReducer(reducer,initialState);

  const updateSort = (e) => {
    const value = e.currentTarget.value;
    dispatch({type:UPDATE_SORT,payload:value});
  }
  const updateFilters = (e) => {
    const name = e.currentTarget.name;
    let value = e.currentTarget.value;
    if(name === 'category'){
      value = e.currentTarget.textContent;
    }
    if(name === 'color'){
      value = e.currentTarget.dataset.color;
    }
    if(name === 'price'){
      value = parseInt(value);
    }
    if(name === 'shipping'){
      value = e.currentTarget.checked;
    }
    dispatch({type:UPDATE_FILTERS,payload:{
      name,
      value
    }});
  }
  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS});
  }
  const setListView = () => {
    dispatch({type:SET_LISTVIEW});
  }
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  }
  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products});
  },[products]);
  useEffect(() => {
    dispatch({type:FILTER_PRODUCTS});
    dispatch({type:SORT_PRODUCTS});
  },[products,state.sort,state.filters]);
  return (
    <FilterContext.Provider value={
      {
        ...state,
        setListView,
        setGridView,
        updateSort,
        updateFilters,
        clearFilters
      }
    }>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
