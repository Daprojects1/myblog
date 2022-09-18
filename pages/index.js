import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import HomePage from "../components/HomePage"
import { BlogDataContext } from "../Context/BlogDataContext"
import useBlogDataContext from "../hooks/BlogData/useBlogDataContext"
import useGetAllBlogs from "../hooks/BlogData/useGetAllBlogs"
import Loading from "../components/Loading"


export default function Home() {

  const { state } = useBlogDataContext(BlogDataContext)
  
  const { getAllBlogs, loading, error } = useGetAllBlogs()
  
  const getBlogs = async () => await getAllBlogs()
  
  useEffect(() => {
    try {
      getBlogs()
    } catch (error) {
      console.log(error)
      toast.error('Sorry, something went wrong !')
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // Do Expired session !
  if (loading) return <Loading/>
  return (
    <HomePage data={state?.allBlogs} />
  )
}
