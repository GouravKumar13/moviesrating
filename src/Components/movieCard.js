import React from 'react'
import { img_url } from '../config'


const MoviesCard = ({ movie }) => {
    return (
       
        <div className='flex flex-col   m-2 p-10'>
            <img className="w-52" src={img_url+ movie.poster_path } alt='Error' />
            <div className=' '>
            <h1 className='break-all text-slate-800 font-bold text-sm'>{movie.title}</h1>
            </div>
            <p className='text-indigo-800'>{movie.genre}</p>
            <p className='font-semibold text-orange-500'> {movie.director}</p>

        </div>
      
    )
}

export default MoviesCard
