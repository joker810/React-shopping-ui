import { useState } from "react";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import CartTile from "../../components/cartTile";
import Modal from "../../components/Modal";
import CheckOutPage from "../checkOutPage";

 function CartListPage(){
	const {cartItems}=useSelector(state=>state.products)
	const [modelOpen,setModelOpen]=useState(false);

	

	if(modelOpen)return <Modal isOpen={modelOpen} onClose={()=>setModelOpen(false)}><CheckOutPage/></Modal>
	return (<div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
		<h1 className="text-2xl font-bold text-white-800 text-center">My Cart-Page</h1>
		<div className="grid md:grid-cols-3 gap-8 mt-12">
			<div className="md:col-span-2 space-y-4">
				{
					cartItems?.length ?
					cartItems.map(singleCartItem=><CartTile singleCartItem={singleCartItem} key={singleCartItem.id}/>)
					: <h1>no items available in the cart</h1>
				}
			</div>
			<div className="bg-gray-400 rounded-sm p-4 h-max">
				<h3 className="text-xl font-extrabold text-gray-950 border-b border-gray-300 pb-2 ">Order summary</h3>
				<ul className="text-gray-700 mt-4 space-y-2">
					<p className="flex flex-wrap gap-4 text-sm font-bold ">Total  <span>{cartItems?.reduce((acc,curr)=>acc+curr.totalPrice,0).toFixed(2)}{" "}$</span></p>
				</ul>
				<div className="mt-5 flex gap-2 ">
					<button disabled={cartItems?.length ===0} className="disabled:opacity-60 text-sm px-4 py-2 bg-black text-white font-extrabold "
					onClick={()=>setModelOpen(true)}
					>checkout</button>
					<Link to='/products'>
					<button className="text-sm px-4 py-2 bg-black text-white font-extrabold ">Continue shopping</button>
					</Link>
				</div>
			</div>
		</div>
	</div>)
}

export default CartListPage;