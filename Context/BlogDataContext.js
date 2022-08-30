import { createContext, useReducer } from "react";


export const BlogDataContext = createContext({})

const blogDataReducer = (state, action) => {
    const allBlogs = [...state?.allBlogs]
    const { id } = action?.payload

    switch (action.type) {
        case 'SET__BLOGS':
            return {  ...state, allBlogs: action.payload }
        case 'DELETE__BLOG':
            const filteredBlog = allBlogs?.filter(b=> b._id !== id )
            return { ...state ,allBlogs: filteredBlog}
        case 'EDIT__BLOG':
            const editBlog = allBlogs.map(b => {
                return b?._id === id ? b : action?.payload
            })
            return { ...state,allBlogs: editBlog }
        case 'CREATE__BLOG':
            const newblog = [...allBlogs, action?.payload]
            return {...state, allBlogs: newblog }
        case 'SET__BLOG':
            return {...state , singleBlog:action.payload}
        case 'PERSONAL__BLOGS':
            return { ...state, personalBlogs: action.payload }
        default:
            return state
    }
}


const BlogDataContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(blogDataReducer, {
        allBlogs: [],
        singleBlog: {},
        personalBlogs: {},
    })
    return ( 
        <BlogDataContext.Provider value={{state, dispatch}}>
            {children}
        </BlogDataContext.Provider>
     );
}
 
export default BlogDataContextProvider;