import { useContext } from "react";
import {useNavigate} from "react-router-dom" 
import { ShoppingCartContext } from "../../context";

function ProductTile({singleProductTile}) {

	//button click navigate to specified url using id.
	const navigate = useNavigate();
	const {handleAddToCart,cartitems}=useContext(ShoppingCartContext);

	function handleNavigateToProductDetailsPage(getCurrentProductId){
		console.log(getCurrentProductId,navigate);
		navigate(`/product-details/${getCurrentProductId}`)
	}

	return (  
		<div className="relative group border-cyan-700 p-6 cursor-pointer">
			<div className="overflow-hidden aspect-w-1 aspect-h-1">
				<img src={singleProductTile?.thumbnail}alt={singleProductTile?.title} className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" />
			</div>
			<div className="flex item-start justify-between mt-4 spacex-x-4">
				<div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
					<p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{singleProductTile?.title}</p>
				</div>
				<div className="text-right">
					<p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]
					">{singleProductTile?.price}</p>
				</div>
			</div>
			<button  onClick={()=>handleNavigateToProductDetailsPage(singleProductTile?.id)}  className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg">view Details</button>

			<button disabled={ cartitems.findIndex(item=>item.id=== singleProductTile?.id

			)> -1} onClick={()=>handleAddToCart(singleProductTile)} className="disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg">Add to Cart</button>
		</div>
	);
}

export default ProductTile;