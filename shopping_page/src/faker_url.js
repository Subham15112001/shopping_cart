export const url = {
    all_products : 'https://fakestoreapi.com/products',
   
    all_categories : 'https://fakestoreapi.com/products/categories',

    single_product : function(id){
        return `https://fakestoreapi.com/products/${id}`;
    },

    single_category : function(category){
        return `https://fakestoreapi.com/products/category/${category}`;
    }
}

