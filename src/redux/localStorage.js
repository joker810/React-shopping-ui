export const loadState=()=>{
    try{
        const serializedState=localStorage.getItem("reduxstate");
        if(!serializedState)return undefined;
        return JSON.parse(serializedState)
    }catch(e){return undefined}
}

export const saveState=(state)=>{
    try{
        const serializeState= JSON.stringify(state);
        localStorage.setItem('reduxstate',serializeState)
    }catch(e){
        console.log('couldnt save ',e)
    }
}