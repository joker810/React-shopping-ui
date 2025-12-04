import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

const CACHE_RESULT={}

function AutoCompleteSearchBar() {

    const [input,setInput] = useState('');
    const [searchResult, setSearchResult]= useState([]);
    const [isClicked,setIsClicked] = useState(true);
    const [highlightIndex,setHighlightIndex]=useState(-1);
    const ref=useRef(null);

    const navigate= useNavigate();

    function handleChange(event){
        const value= event.target.value.trim();
        setInput(value);
    }

    async function fetchSearch(){
        try{
            if (CACHE_RESULT[input]) {
            setSearchResult(CACHE_RESULT[input]);
            return;
            }       
            const response = await fetch(`https://dummyjson.com/products/search?q=${input}`);
            const data = await response.json();
            CACHE_RESULT[input]=data.products;
            setSearchResult(data.products)
        }
        catch(err){
            console.log(err)
        }
    }

    function handleNavigate(id){
        navigate(`/product-details/${id}`)
    }

    useEffect(()=>{
        if (input.trim() === "") { 
                return;  //dont make api call on empty input..
            }
        let timer;
        setTimeout(()=>{
            
            timer=fetchSearch()
        },500)
        return ()=>clearTimeout(timer);
    },[input])

    console.log(searchResult)

    function handleTargetHighlight(event){
        if(event.key==="ArrowDown"){
            setHighlightIndex((prev)=>prev<searchResult.length-1 ? prev+1 : 0 );
        }
        if(event.key==="ArrowUp"){
            setHighlightIndex(prev=> prev>0 ? prev-1 : searchResult.length-1);
        }
        if(event.key==="Enter" && highlightIndex!==-1){
            const selected= searchResult[highlightIndex]
            setInput(selected.title);
            handleNavigate(selected.id)
        }

    }

    return ( 
        <div className="relative w-full">
        <input  
            placeholder="Search for products" 
            className="
            w-full 
            px-4 py-3
            rounded-xl
            border border-gray-300
            shadow-sm
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
            transition
            "
            onChange={(event)=>handleChange(event)}
            value={input}
            ref={ref}
            onFocus={()=>setIsClicked(true)}
            onBlur={()=>setIsClicked(false)}
            onKeyDown={(event)=>handleTargetHighlight(event)}
        />

        <div
        className="
        absolute 
            left-0 
            top-full 
            mt-1
            bg-white 
            border 
            rounded-xl 
            shadow-lg 
            w-full
            max-h-64 
            overflow-y-auto
            z-50
        "
        >
            {isClicked &&
            searchResult.slice(0, 10).map((res, index) => (
                <p
                key={res.id}
                onMouseEnter={() => setHighlightIndex(index)}
                onMouseDown={() => handleNavigate(res.id)}
                className={`text-black px-3 py-2 cursor-pointer 
                    ${highlightIndex === index ? "bg-slate-500 text-white" : ""}
                `}
                >
                {res.title}
                </p>
            ))}
        </div>
        </div>

     );
}

export default AutoCompleteSearchBar;


