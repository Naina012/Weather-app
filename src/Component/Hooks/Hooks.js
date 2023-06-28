import React, { useEffect, useReducer, useState } from 'react'
const reducer =(state,action)=>{
if(action.type==="incc"){
    state=state+1
}
if(state>0 && action.type==="decc"){
    state=state-1
}
return state
}
const Hooks=()=> {
    // const[myNo,setMyNo]=useState(10)
    // useEffect(()=>{
    //     document.title=`chats(${myNo})`
    // })

    const[state,dispatch]=useReducer(reducer,10)
  return (
    <>
     <div>{state}</div>
     <button onClick={()=>dispatch({type:"incc"})}>inc</button>
     <button onClick={()=>dispatch({type:"decc"})}>dec</button>
    </>
  )
}

export default Hooks


