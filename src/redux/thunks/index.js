import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";


// export const fetchProducts=createAsyncThunk('products/fetchProducts',async()=>
// {
//     const response=await fetch(`https://dummyjson.com/products`);
//     const data=await response.json();
//     return data;
// }
// )

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 1) => {
    const limit = 30;
    const skip = (page - 1) * limit;

    const res = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
    const data = await res.json();

    // prevent going beyond available pages
    if (data.products.length === 0) {
      return { ...data, products: [], invalidPage: true };
    }

    return data;
  }
);

const sleep =ms =>new Promise(r=>setTimeout(r,ms));


export const fetchProductDetails=createAsyncThunk('products/fetchProductDetails',async(productId,thunkAPI)=>{

    const baseDelay=300 //ms
    const retries=5;

    const controller = new AbortController();
    //This line connects Redux Toolkit's abort signal to your local AbortController. It sets up a listener so that when Redux Toolkit decides to abort (e.g., when your component calls promise.abort()), your local controller will also abort.
    thunkAPI.signal.addEventListener('abort',()=>controller.abort())

    for(let attempts=0;attempts<retries;attempts++){
        try{
            const response = await fetch(`https://dummyjson.com/products/${productId}`,
            {signal:controller.signal}
            );
            
            if(!response.ok){
                throw new Error('server error',response.status);
            }
            return await response.json();
        }
        catch(err){
          if(err.name==="AbortError"){
            console.log('Aborted by signal');
            return thunkAPI.rejectWithValue('Aborted');
          }

            if(attempts === retries -1){
                return thunkAPI.rejectWithValue('failed after retries');
            }

            let jitter = Math.random() * 150; //randomness for users 
            let delay = baseDelay * (2 ** attempts) + jitter;
            console.log(`Retrying API... attempt=${attempts + 1}, delay=${delay}`);
            await sleep(delay);

            if(thunkAPI.signal.aborted){
              return thunkAPI.rejectWithValue("Aborted");
            }
        }
        finally{
          thunkAPI.signal.removeEventListener('abort',()=>controller.abort())
        }//cleanup event listener to avoid memory leaks
    }
})