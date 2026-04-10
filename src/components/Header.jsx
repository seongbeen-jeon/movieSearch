import {Link} from 'react-router-dom';

function Header(){

    return (
        <header id="header" className="flex justify-between p-1 items-center bg-[#212121] ">
            <div id="logo"><Link to="/"><img className="w-30 h-auto"src="/filmlogo.png" alt="logo" /></Link></div>
        </header>
    );
}

export default Header