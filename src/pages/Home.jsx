import MovieCard from '../components/MovieCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import {useState,useEffect,useRef} from 'react';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [pages,setPages] = useState(1);
  const scrollTrigger = useRef(null);

  const url = import.meta.env.VITE_API_URL;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  useEffect(()=>{
    async function loadMovie(){
      try{

        const response = await fetch(`${url}/api/movies?page=${pages}`,options);
        setLoading(true);
        
        if(!response.ok){
          throw new Error("network error");
        }

        const json = await response.json();
        console.log(pages);
        setMovies(prev=>[...prev, ...json.results]);
      }catch(error){
        console.log(error);
      }
      setLoading(false);
      
    }
    loadMovie();
  },[pages]);

  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && !loading){
        setPages(prev=>prev+1);
      }
    });

    if(scrollTrigger.current){
      observer.observe(scrollTrigger.current);
    }
    
    return () => observer.disconnect();
  },[loading])


  if(loading) return <h1>Loading... </h1>;
  return ( 
    <>
    <SearchBar/>
    <div id="MovieList" className="*:p-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {
        movies.map((movie)=>
            <MovieCard key = {movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path}/>
        )
      }
      <div ref={scrollTrigger}></div>
    </div>
    </>
  )
}

export default Home
