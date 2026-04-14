import {useState} from 'react';
import {Link} from 'react-router-dom';


function SearchBar(){

    const [search,setSearch] = useState("");
    const [dropbox,setDropbox] = useState([]);

    function onchange(event){
        const value = event.target.value;

        setSearch(value);
    }

    function onsubmit(event){
        event.preventDefault();
        console.log("submit");
        
        //api 요청
        handleSearch();
    }

    async function handleSearch(){
        try{
            const url = import.meta.env.VITE_API_URL;
            const options = {
                method : 'GET',
                headers : {
                    accept : 'application/json'
                }
            };
        
            const response = await fetch(`${url}/api/search?title=${search}`,options);
            if(!response.ok){
                throw new Error('network Error');
            }

            const result = await response.json();

            if(!result.results || result.results.length === 0){
                console.log('검색결과 없음');
            }else{
                const processed = result.results.map((movie)=>({
                    id : movie.id,
                    title : movie.title,
                    releaseYear : movie.release_date.split("-")[0],
                    language : movie.original_language.toUpperCase(),
                }));
                setDropbox(processed);
            }

        }catch(e){
            console.log(e);
        }
    }


    return(
        <div className="flex justify-center p-5">
            <form className ="relative p-1 border bg-blue-50"action="" onSubmit={onsubmit}>
                <input type="text" className="w-xl" id="search" placeholder ="search" onChange={onchange} />
                <span onClick = {onsubmit} className='text-right' >검색</span>
                { dropbox.length > 0 && (
                    <div className="absolute border p-1 top-full left-0 w-full z-50 bg-white">{dropbox.map(movie=><div key={movie.id}><Link to= {`/detail/${movie.id}`}>{movie.title} ({movie.releaseYear}, {movie.language})</Link></div>)}</div>)}
            </form>  
        </div>
    );

}

export default SearchBar