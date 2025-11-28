import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/slices/productsSlice";
import ProductTile from "../../components/productTile";
import Pagination from "../pagination";

 function ProductListPage(){

	const dispatch= useDispatch();
	const {loading,cartItems,error,totalNumberOfPages,listOfProducts,currentPage}=useSelector(state=>state.products);

	const safeTotalPages = Number.isFinite(totalNumberOfPages) && totalNumberOfPages > 0
  		? totalNumberOfPages
  		: 0;

	const arrayOfPages =
  safeTotalPages > 0
    ? Array.from({ length: safeTotalPages }, (_, i) => i + 1)
    : [];


	useEffect(()=>{
		dispatch(fetchProducts(currentPage))
	},[dispatch,currentPage])

	console.log(currentPage,totalNumberOfPages);
	// console.log(listOfProducts);
	


	if(loading) return <h1>Loading data! please wait</h1>
	if(error)return <h1>{error}</h1>

	return <section className="py-12 bg-white sm:py-16">
		<div className="px-4 mx-auto sm:px-6 lg:px-8">
			<div className="relative flex justify-between max-w-md mx-auto text-center">
				<h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">Our featured products</h2>

				<Link to='/cart-list'>
				<div className="absolute top-0 right-0 text-white cursor-pointer flex items-center group ">
  				<i className="text-2xl mr-2 hover:scale-125">🛒</i>
  				<span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full absolute -top-2 -right-2">
    			{cartItems.length||0}
  				</span>
				</div>
				</Link>


			</div>
			<div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
				{
					listOfProducts && listOfProducts.length > 0 ? listOfProducts?.map((singleProductTile)=><ProductTile singleProductTile={singleProductTile} key={singleProductTile.id}/>) : <h3>no products </h3>
				}
				

			</div>
			{arrayOfPages && listOfProducts?.length>0 && <Pagination Pages={arrayOfPages}/ >}
		</div>
	</section>;
};

export default ProductListPage;