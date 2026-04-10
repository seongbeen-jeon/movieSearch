import {useState, useEffect} from 'react';

function MovieDetail ({backDropPath, title, genres, overview, runtime, tagline, voteAverage, voteCount}){
    
    return (
        <div className="[&>*]:p1">
            <div id="poster"><img src={`https://image.tmdb.org/t/p/w300/${backDropPath}`} /></div>
            <div id="meta">
                <h2>{title}</h2>
                <span>별점 : {voteAverage} ({voteCount}) • {genres.map((genre)=><span key={genre.id}>{genre.name} </span>)} • {runtime}분 </span>
                <span>{tagline}</span>
                <br/>
            </div>
            <div id="data">
                내용 : {overview}
                
            </div>
        </div>
    );
}

export default MovieDetail