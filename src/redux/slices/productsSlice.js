import {  createSlice } from "@reduxjs/toolkit";
import { fetchProductDetails, fetchProducts } from "../thunks";


const productSlice=createSlice({
    name:'products',
    initialState:{
        listOfProducts:[],
        cartItems:[],
        productDetails:null,
        loading:true,
        error:null, //pagination
        productsPerPage:8,
        currentPage:1,
        currentListOfProducts:[],
        totalNumberOfPages: 0
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
    },

    setCurrent:(state,action)=>{
        state.currentPage=action.payload;
        //server api paginated...
        // const start=(action.payload-1)*productsPerPage;
        // const end=start+productsPerPage;
        // state.currentListOfProducts=state.listOfProducts.slice(start,end);
    }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            if (action.payload.invalidPage) {
        // force page back into valid range
        state.currentPage = state.totalNumberOfPages;
        return;
    }

        const { products, total, limit } = action.payload;
        state.loading = false;

        state.listOfProducts = products;
        state.totalNumberOfPages = Math.ceil(total / limit);
        state.currentPage = action.meta.arg || 1;
            //server paginated so commented out
            // const start= (state.currentPage-1)*state.productsPerPage;
            // const end=start+state.productsPerPage;
            // state.currentListOfProducts=action.payload.slice(start,end);
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

export const{handleAddToCart, handleRemoveFromCart, setCurrent}=productSlice.actions;
export default productSlice.reducer;