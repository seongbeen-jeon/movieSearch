import MovieCard from '../components/MovieCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import {useState} from 'react';
import {useEffect} from 'react';


function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    async function loadMovie(){
      try{
        const url = import.meta.env.VITE_API_URL;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        };
        console.log("Url : ",url);
        const response = await fetch(`https://${url}/api/movies`,options);
        
        if(!response.ok){
          throw new Error("network error");
        }

        const json = await response.json();
        setMovies(json.results);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    loadMovie();
  },[]);

  if(loading) return <h1>Loading... </h1>;
  return ( 
    <>
    <SearchBar/>
    <div id="MovieList" className="flex *:p-5 size overflow-x-auto">
      {
        movies.map((movie)=>
            <MovieCard key = {movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path}/>
        )
      }
    </div>
    </>
  )
}

export default Home
