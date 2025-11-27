import {  useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { useDispatch , useSelector} from "react-redux";
import { handleAddToCart } from "../../redux/slices/productsSlice";


function ProductDetailsPage(){

	const {id}=useParams();
	const dispatch=useDispatch();
	const {productDetails,loading,cartItems}=useSelector(state=>state.products);


	useEffect(()=>{
		dispatch(fetchProductDetails(id))
	},
	[id])

	if(loading) return <h1>Product details loading please wait</h1>

	return <div>
		<button><Link to='/products'> Home</Link></button>
		<div className="p-6 lg:max-w-7x1 max-w-4xl mx-auto">
			<div className="grid items-center grid-cols-1 lg:grid-cols-5 shadow-lg p-6">
				<div className="
				lg:col-span-3 w-full lg:sticky top-0 text-center">
					<div className="px-4 py-10 rounded-xl shadow-lg relative">
						<img className="w-4/5 rounded object-cover" src={productDetails?.thumbnail} alt={productDetails?.title} />
					</div>
					<div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
						{
							productDetails?.images?.length ?

							productDetails?.images.map(imageItem=>
								<div className="rounded-xl p-4 shadow-md" key={imageItem}>
									<img src={imageItem} className="w-24 cursor-pointer" alt="product secondary image" />
								</div>
							): null
						}
					</div>
				</div>
				<div className="lg:col-span-2">
					<h2 className="text-2xl font-extrabold text-[#FFFFFF]">{productDetails?.title}</h2>
					<div className="flex flex-wrap gap-4 mt-4">
						<p className="text-xl font-bold">{productDetails
							?.price}$</p>
					</div>
					<div>
						<button disabled={productDetails ? cartItems.findIndex(item=>item.id=== productDetails.id)> -1 : false} onClick={()=>dispatch(handleAddToCart(productDetails))}  className="disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold run">Add to cart</button>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

export default ProductDetailsPage;