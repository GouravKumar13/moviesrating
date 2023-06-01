import React, { useEffect, useState } from 'react'
import Shimmer from './shimmer'
import { Link } from 'react-router-dom'
import MoviesCard from './movieCard'
import userEvent from '@testing-library/user-event'


const Search = () => {
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTgyODkyNTEwYmRhMTM0YzU0NTZmYTYwMmZhNDczZiIsInN1YiI6IjY0NzM2MjM2YTE5OWE2MDBkYzRjYzU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88YIRRPO-Z0tbeb2soBwHVWuGgcVUN1dVaKFjynu8FM'
        }
    };
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isLoad, setIsLoad] = useState(true)
    const [pages, setPages] = useState(1)
    // const allMovies = useSelector((state) => state.FilterData.allMovies)

    // const dispatch = useDispatch()
const handleInfiniteScroll = async()=>{
    try{
        if(window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.scrollHeight){
         setPages((prev)=>prev+1)
        }
    }
catch(error){
    console.error(error)
}}

useEffect(()=>{
    window.addEventListener("scroll", handleInfiniteScroll)
    return ()=> window.removeEventListener("scroll", handleInfiniteScroll)
},[])
    
    useEffect(() => {
        getSearchResults()
    }, [searchText , pages ])

useEffect(() => {
    setSearchResults([])
},[searchText])

    const getSearchResults = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`, options)
            const json = await data.json();
           setSearchResults( prev =>[...prev, ...json.results])
            setIsLoad(false)

        }
        catch (err) {
            console.error(err)
        }
    }

    // const SearchData = () => getSearchResults(searchText , setSearchResults)

    console.log(searchResults)
    console.log(searchText)
    return (
        <div>
            <div className='flex justify-center  '>
                <input placeholder='search...' type='text' className='rounded-l-lg h-9 bg-blue-200 text-white ' onChange={ (e)=>setSearchText(e.target.value) } value={ searchText } />
                <button className='border border-black w-8 flex justify-center items-center bg-blue-200  rounded-r-lg h-9 '><svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg></button>
            </div>
            <div className='flex flex-wrap justify-center'>
                {
                    searchResults.map((movie) => (
                        isLoad ? <Shimmer key={ movie.id } /> :
                            <Link to={ "/movies?s=" + movie.id } key={ movie.id }>
                                <MoviesCard movie={ movie } />
                            </Link>

                    )) }
            </div>
        </div>
    )
}

export default Search
