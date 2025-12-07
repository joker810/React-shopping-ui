import { useState,useEffect,useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

const CACHE_RESULT={};

function AutoCompleteSearchBar() {

    const [input,setInput] = useState('');
    const [searchResult, setSearchResult]= useState([]);
    const [isClicked,setIsClicked] = useState(true);
    const [highlightIndex,setHighlightIndex]=useState(-1);
    const itemRefs=useRef([]);
    const timeoutRef=useRef();

    const navigate= useNavigate();

    function handleChange(event){
        const value= event.target.value.trim();
        setInput(value);
    }

    const fetchSearch = useCallback(async()=>{
        const trimmedInput = input.trim();
        
        if (!trimmedInput) {
            setSearchResult([]);
            return;
        }

        try {
            if (CACHE_RESULT[trimmedInput]) {
                setSearchResult(CACHE_RESULT[trimmedInput]);
                return;
            }
            
            const response = await fetch(`https://dummyjson.com/products/search?q=${trimmedInput}`);
            const data = await response.json();
            const slicedResult = data.products.slice(0, 10);
            
            CACHE_RESULT[trimmedInput] = slicedResult;
            setSearchResult(slicedResult);
        } catch(err) {
            console.log(err);
            setSearchResult([]);
        }
    }, [input])

    function handleNavigate(id){
        navigate(`/product-details/${id}`)
    }

    useEffect(()=>{

        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
        if (input.trim() === "") { 
                return;  //dont make api call on empty input..
            }
        
        timeoutRef.current=setTimeout(()=>{
            fetchSearch()
        },500)
        return ()=>{
            if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    }
    },[input,fetchSearch])

    useEffect(() => {
  if (highlightIndex !== -1 && itemRefs.current[highlightIndex]) {
    itemRefs.current[highlightIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
}, [highlightIndex]);


    console.log(searchResult)

    function handleTargetHighlight(event){
        if(event.key==="ArrowDown"){
            event.preventDefault();
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
            searchResult.map((res, index) => (
                <p
                key={res.id}
                ref={el=>itemRefs.current[index]=el}
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


