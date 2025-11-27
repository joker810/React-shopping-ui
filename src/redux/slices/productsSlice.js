import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProducts=createAsyncThunk('products/fetchProducts',async()=>
{
    const response=await fetch(`https://dummyjson.com/products`);
    const data=await response.json();
    return data;
}
)

export const fetchProductDetails=createAsyncThunk('products/fetchProductDetails',async(productId)=>{
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data= await response.json();
    return data;
})

const productSlice=createSlice({
    name:'products',
    initialState:{
        listOfProducts:[],
        cartItems:[],
        productDetails:null,
        loading:true,
        error:null
    },
    reducers:{
        handleAddToCart: (state, action) => {
            const product = action.payload;
            const index = state.cartItems.findIndex(item => item.id === product.id);

        if (index === -1) {
            state.cartItems.push({
            ...product,
            quantity: 1,
            totalPrice: Number(product.price),
        });
        } else {
            const item = state.cartItems[index];
            item.quantity++;
            item.totalPrice = item.quantity * Number(item.price);
  }
},
    handleRemoveFromCart:(state,action)=>{
        const {getProductDetails, isFullyRemoveFromCart} = action.payload;

        const index= state.cartItems.findIndex(item=>item.id===getProductDetails.id);

        if(isFullyRemoveFromCart){
            state.cartItems.splice(index,1);
        }
        else{
            const item = state.cartItems[index];
            item.quantity--;
            item.totalPrice = item.quantity * Number(item.price);
        }
    }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.listOfProducts=action.payload.products;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error= action.error.message;
        })
        .addCase(fetchProductDetails.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.productDetails=action.payload;
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message;
        })
    }
})

export const{handleAddToCart, handleRemoveFromCart}=productSlice.actions;
export default productSlice.reducer;