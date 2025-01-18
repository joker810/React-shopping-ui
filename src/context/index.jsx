import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({children}){

	const [loading,setLoading]=useState(true);
	const [listOfProducts,setListOfProducts]=useState([]);
	const [productDetails,setProductDetails]=useState(null);
	const [cartitems,setCartItems]=useState([]);
	const navigate=useNavigate();

	function openCart(){
		navigate('/cart-list');
	}

	async function fetchListOfProducts(){
		const apiResponse=await fetch('https://dummyjson.com/products');
		const result=await apiResponse.json();
		
		if(result && result?.products){
			setListOfProducts(result?.products);
			setLoading(false);
		}
	}

	function handleAddToCart(getProductDetails){
		console.log(getProductDetails);

		let cpyExistingCartItems= [...cartitems];
		const findIndexOfCurrentItem=cpyExistingCartItems.findIndex(cartItem=> cartItem.id=== getProductDetails.id);
		
		console.log(findIndexOfCurrentItem);
		
		if(findIndexOfCurrentItem === -1){
			cpyExistingCartItems.push(
				{
					...getProductDetails,
					quantity:1,
					totalPrice: getProductDetails?.price
				}
			)
		}
		else{
			console.log("here");
			cpyExistingCartItems[findIndexOfCurrentItem]={
				...cpyExistingCartItems[findIndexOfCurrentItem],
				quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity+1,
				totalPrice : (cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1)*cpyExistingCartItems[findIndexOfCurrentItem].price

			}
			
		}
		console.log(cpyExistingCartItems,'item');
		setCartItems(cpyExistingCartItems);
		localStorage.setItem('cartItems',JSON.stringify(cpyExistingCartItems));
		navigate("/cart-list");
	}

	function handleRemoveFromCart(getProductDetails,isFullyRemoveFromCart){

		let cpyExistingCartItems= [...cartitems];
		const findIndexOfCurrentCartItem = cpyExistingCartItems.findIndex(items=> items.id===getProductDetails.id);

		if(isFullyRemoveFromCart){
			cpyExistingCartItems.splice(findIndexOfCurrentCartItem,1)
		}else{
			cpyExistingCartItems[findIndexOfCurrentCartItem]={
				...cpyExistingCartItems[findIndexOfCurrentCartItem],
				quantity:cpyExistingCartItems[findIndexOfCurrentCartItem].quantity-1,
				totalPrice:(cpyExistingCartItems[findIndexOfCurrentCartItem].quantity-1)* cpyExistingCartItems[findIndexOfCurrentCartItem].price
			}
		}

		localStorage.setItem('cartItems',JSON.stringify(cpyExistingCartItems));
		setCartItems(cpyExistingCartItems);
	}


	useEffect(()=>{
		fetchListOfProducts();
		setCartItems(JSON.parse(localStorage.getItem('cartItems')));
	}
	,[])

	console.log(cartitems);


	return (<ShoppingCartContext.Provider value={{
		listOfProducts,
		loading,setLoading,
		productDetails,setProductDetails,
		handleAddToCart,
		cartitems,
		handleRemoveFromCart,
		openCart
	}}>{children}</ShoppingCartContext.Provider>);
}

export default ShoppingCartProvider;