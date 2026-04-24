import {Link} from 'react-router-dom';

function MovieCard({id, title,posterPath}){
  return(
    <div className="MovieCard shrink-0 w-50 ">
      <Link className="w-full"to={`/detail/${id}`}><img className="rounded-4xl"src={`https://image.tmdb.org/t/p/w200${posterPath}`} /></Link>
      <div className="w-full">{title}</div>
    </div>
  );
}

export default MovieCard