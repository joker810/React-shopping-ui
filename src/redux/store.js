import { configureStore } from "@reduxjs/toolkit"
import ProductsReducer from './slices/productsSlice'
import { loadState, saveState } from "./localStorage";
export const store=configureStore({
    reducer:{
        products:ProductsReducer
    },
    preloadedState:loadState()
})

store.subscribe(()=>{
    saveState({products:{cartItems:store.getState().products.cartItems}})
})

export default store;