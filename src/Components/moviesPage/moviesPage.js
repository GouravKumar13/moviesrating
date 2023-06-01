import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {  img_url } from '../../config';

const MoviesPage = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([])
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTgyODkyNTEwYmRhMTM0YzU0NTZmYTYwMmZhNDczZiIsInN1YiI6IjY0NzM2MjM2YTE5OWE2MDBkYzRjYzU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88YIRRPO-Z0tbeb2soBwHVWuGgcVUN1dVaKFjynu8FM'
        }
      };
      
      
        

    useEffect(() => {
        getMovies()
    }, [searchParams.get('s')])

    const getMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${searchParams.get("s")}?language=en-US`, options)
            const result = await response.json();
            setMovies(result)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className=" flex justify-start mt-14">
            <div className="ml-16 flex flex-col items-start" >
              
                <div className='flex gap-2'>
                    <img className='h-96 rounded-lg' src={ img_url + movies.poster_path } alt="" />
                    <div className='ml-8 mt-10 max-w-[600px] flex flex-col gap-1'>
                    <h1 className='font-bold  text-xl  uppercase '>{ movies.title }</h1>
                    <div className='flex gap-1'>
                    {movies.genres && movies.genres.map((genre) => (
                        <span className='font-medium text-sm capitalize bg-blue-500 text-white px-2'  key={genre.id}>{genre.name}</span>
                    ))}
                    </div>
                    <p className='font-normal italic'>"{movies.tagline}"</p>
                    <h2 className='font-semibold  '>Overview</h2>
                    <p className='font-medium italic text-slate-500'>{movies.overview}</p>
                     



                    </div>


                </div>
            </div>

        </div>
    )
}

export default MoviesPage
