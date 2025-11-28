import { useDispatch ,useSelector} from "react-redux";
import { setCurrent } from "../../redux/slices/productsSlice";
function Pagination({Pages}) {

    const dispatch = useDispatch();
    const {currentPage,totalNumberOfPages}=useSelector(state=>state.products)

    function handlePageClick(page){
        if (page < 1 || page > totalNumberOfPages) return;
        dispatch(setCurrent(page))
    }

    return ( 
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <button onClick={()=>handlePageClick(currentPage-1)} disabled={currentPage===1}>prev</button>
            {Pages?.map(page=><button
      key={page}
      onClick={() => handlePageClick(page)}
      disabled={currentPage === page || page > totalNumberOfPages}
      className={`
        px-3 py-1 rounded-md border-black border 
        transition mr-4
        ${currentPage === page 
          ? "bg-blue-600 text-white cursor-not-allowed opacity-80" 
          : "bg-white text-gray-700 hover:bg-blue-100"}
      `}
    >
      {page}
    </button>)}
        <button onClick={()=>handlePageClick(currentPage+1)} disabled={currentPage>totalNumberOfPages}>next</button>
        </div>
     );
}

export default Pagination;

