



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTgyODkyNTEwYmRhMTM0YzU0NTZmYTYwMmZhNDczZiIsInN1YiI6IjY0NzM2MjM2YTE5OWE2MDBkYzRjYzU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88YIRRPO-Z0tbeb2soBwHVWuGgcVUN1dVaKFjynu8FM'
    }
};
export const getMoviesData = async (setMovies,setIsLoad ,pages  ) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${pages}&sort_by=popularity.desc`, options)

        const result = await response.json();

        setMovies((prev) => [...prev, ...result?.results]);
        
        const load = setInterval(() => { setIsLoad(false) }, 2000)
        return () => clearInterval(load)
        // setIsLoad(false)
        // setFilteredMovies(result);
    } catch (error) {
        console.error(error);
    }
}