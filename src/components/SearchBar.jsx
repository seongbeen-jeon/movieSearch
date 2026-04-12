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
                
                setDropbox(result.results);
            }

        }catch(e){
            console.log(e);
        }
    }


    return(
        <div className="flex justify-center p-5">
            <form action="" onSubmit={onsubmit}>
                <input type="text" className="w-xl p-1 border bg-blue-50" id="search" placeholder ="search" onChange={onchange} />
                <span onClick = {onsubmit}>검색</span>
                <div>{dropbox.map(movie=><div key={movie.id}><Link  to = {`/detail/${movie.id}`}>{movie.title}</Link></div>)}</div>
            </form>  
        </div>
    );

}

export default SearchBar