import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context';
import Loading from './Loading';
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {products_loading:loading} = useProductsContext();
  const {filtered_products:products,gridView} = useFilterContext();
  if(loading){
    return <Loading />
  }
  if(products.length < 1){
    return (
      <h5>
        sorry, no products matched your search...
      </h5>
    );
  }
  if(gridView === false){
    return <ListView products={products} />;
  }
  return <GridView products={products} />;

}

export default ProductList
