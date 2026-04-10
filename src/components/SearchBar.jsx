import {useState} from 'react';


function SearchBar(){

    const [search,setSearch] = useState("");
    const [dropbox,serDropbox] = useState(false);

    function onchange(event){
        const value = event.target.value;

        // 서치에 들어간 값이 api에 바로 넣을 수 있게 가공
        console.log(value);
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
            const option = {
                method : GET,
                header : {
                    accept : 'application/json'
                }
            };
        
            const response = await fetch(`${url}/api/search?title=${search}`,option);
            if(!response.ok){
                throw new Error('network Error');
            }

            const result = await response.json();
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }


    return(
        <div className="flex justify-center p-5">
            <form action="" onSubmit={onsubmit}>
                <input type="text" className="w-xl p-1 border bg-blue-50" id="search" placeholder ="search" onChange={onchange} />
                <span onClick = {onsubmit}>검색<img src="" alt="" /></span>
            </form>  
        </div>
    );

}

export default SearchBar