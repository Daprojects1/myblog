import { createContext, useState,useEffect } from "react";


const getItem = (item) => {
    if (typeof window !== 'undefined')
    return JSON.parse(localStorage.getItem(item))
  }

  const setItem = (key, item) => {
    if (typeof window !== 'undefined')
      return localStorage.setItem(key,item)
}

const BgContext = createContext({})

export const BgContextProvider = ({ children }) => {

  const [checked,setChecked] = useState(() => {
    const chked = getItem("checked")
    return chked? chked : false
  })

  useEffect(() => {
  const body = document.querySelector('body')
  if (!checked) {
      body.classList.remove('bg-white')
    body.classList.add('bg-black')
      return
  } 
  body.classList.remove('bg-black')
  body.classList.add('bg-white')
  },[checked])


  const toggleChecked = () => {
    setChecked(prev => {
      setItem('checked', !prev)
      return !prev
    })
  }

  return (
     <BgContext.Provider value={{checked, toggleChecked}}>
        {children}
    </BgContext.Provider>
  ) 
}


export default BgContext