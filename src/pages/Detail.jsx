import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import MovieDetail from '../components/MovieDetail.jsx';

function Detail(){
    const {id} = useParams();
    const [loading,setLoading] = useState(true);
    const [movieData, setMovieData] = useState({});

    useEffect(()=>{
        async function getMovieDetail(){
            try{
                const url = import.meta.env.VITE_API_URL;
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                    }
                };

                const response = await fetch(`${url}/api/detail/${id}`,options);
                if(!response.ok){
                    throw new Error("network Error!");
                }
                const json = await response.json();
                
                setMovieData(json);
            }catch(error){  
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        
        getMovieDetail();
        },[id]);
    if(loading) return <h3>Loading...</h3>
        
    return(
        <div id="detail" className="px-4 max-w-xl mx-auto">
            <h1 className="text-4xl ">{movieData.title}</h1>
                <MovieDetail
                    backDropPath={movieData.backdrop_path} 
                    title={movieData.title} 
                    genres={movieData.genres} 
                    overview={movieData.overview} 
                    runtime={movieData.runtime} 
                    tagline={movieData.tagline} 
                    voteAverage={movieData.vote_average} 
                    voteCount={movieData.vote_count}
                />
        </div>
    )
}

export default Detail