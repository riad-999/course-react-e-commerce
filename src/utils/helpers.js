export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    }).format(price / 100);
}

export const getUniqueValues = (data,type) => {
    let types = data.map(item => item[type]);
    if(type === 'colors'){
        types = types.flat();
    }
    const uniqueTypes = new Set(types);
    return ['all',...uniqueTypes];
}
