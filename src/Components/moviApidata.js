import { useEffect, useState } from 'react'
import MoviesCard from './movieCard';
import { Link } from 'react-router-dom';
import Shimmer from './shimmer';
import { getMoviesData } from './util/ApiData';

const MoviApiData = () => {




    //  THIS STATE IS FOR SETING THE FETCHED DATA IN A STATE
    const [allMovies, setMovies] = useState([])
    // THIS STATE IS FOR PAGINATION
    const [pages, setPages] = useState(1)
    // THIS STATE IS TO CHECK IF THE DATA IS LOADED OR NOT
    const [isLoad, setIsLoad] = useState(true)
    // this state is for implementing the search functionality


  

    // THIS IS TO IMPLEMENT THE INFINITE SCROLL
    const handleInfiniteScroll = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.scrollHeight) {
                setPages((prev) => prev + 1)
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {

        window.addEventListener("scroll", handleInfiniteScroll)
        return () => window.removeEventListener("scroll", handleInfiniteScroll)

    }, [])


    useEffect(() => {
        Data()

    }, [pages])

    // THIS IS THE FUNCTION TO FETCH THE DATA FROM THE API
    const Data = () => getMoviesData(setMovies, setIsLoad, pages)


    return (
        <div className='flex flex-wrap justify-center'>
            {
                allMovies.map((movie) => (
                    isLoad ? <Shimmer key={ movie.id } /> :
                        <Link to={ "/movies?s=" + movie.id } key={ movie.id }>
                            <MoviesCard movie={ movie } />
                        </Link>

                )) }
        </div>
    )




}
export default MoviApiData
