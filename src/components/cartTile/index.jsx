import { useDispatch } from "react-redux";
import { handleAddToCart,handleRemoveFromCart } from "../../redux/slices/productsSlice";

function CartTile({singleCartItem}) {

	const dispatch = useDispatch()

	function addToCart(){
		dispatch(handleAddToCart(singleCartItem))
	}

	function removeFromCart(singleCartItem,flag){
		dispatch(handleRemoveFromCart(
			{getProductDetails:singleCartItem,isFullyRemoveFromCart:flag}
		))
	}

	return ( <>
		<div className="grid grid-cols-3 items-start gagp-5">
		<div className="col-span-2 flex items-start gagp-4">
			<div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
				<img className="w-full h-full object-contain"
				src={singleCartItem?.thumbnail} alt={singleCartItem?.title} />
			</div>
			<div>
				<h3 className="text-base font-bold
				 text-white-900">{singleCartItem?.title}</h3>
				 <button onClick={()=>removeFromCart(singleCartItem,true)} className="text-sm px-4 py-2 bg-black text-white font-extrabold ">Remove</button>
			</div>
		</div>
		<div className="ml-auto ">
		<h3 className="text-lg font-bold text-white-900">{singleCartItem?.totalPrice.toFixed()}$</h3>
		<p className="mt-2 mb-3 font-bold text-[16px]">Quantity:{singleCartItem?.quantity}</p>
		<div className="mt-3">
			<button onClick={addToCart} className="border border-white">+</button>

			<button onClick={()=>removeFromCart(singleCartItem,false)} className="disabled:opacity-65 border border-white" disabled={singleCartItem?.quantity === 1}>-</button>
		</div>
		</div>
		
	</div>
	<hr />
	</>
	);
}

export default CartTile;